
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title RewardsDistributor
 * @dev Distributes transaction fees to 5 lifetime reward winners
 * As per whitepaper: 1% of all transaction fees split equally among 5 winners
 */
contract RewardsDistributor is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public rewardToken;
    address public tokenContract; // Verifyz token allowed to call distributeFees
    address[5] public lifetimeWinners;
    bool public winnersSet;
    
    mapping(address => uint256) public pendingRewards;
    mapping(address => uint256) public claimedRewards;
    
    uint256 public totalDistributed;
    uint256 public totalClaimed;
    
    event RewardTokenSet(address indexed token);
event TokenContractSet(address indexed tokenContract);
event WinnersSet(address[5] winners);
    event FeesDistributed(uint256 amount);
    event RewardsClaimed(address indexed winner, uint256 amount);

    constructor() Ownable(msg.sender) {}

    

function setRewardToken(address _token) external onlyOwner {
    require(_token != address(0), "Invalid token");
    rewardToken = IERC20(_token);
    emit RewardTokenSet(_token);
}

function setTokenContract(address _tokenContract) external onlyOwner {
    require(_tokenContract != address(0), "Invalid address");
    tokenContract = _tokenContract;
    emit TokenContractSet(_tokenContract);
}
function setLifetimeWinners(address[5] calldata winners) external onlyOwner {
        require(!winnersSet, "Winners already set");
        
        for (uint256 i = 0; i < 5; i++) {
            require(winners[i] != address(0), "Invalid winner address");
            lifetimeWinners[i] = winners[i];
        }
        
        winnersSet = true;
        emit WinnersSet(winners);
    }

    function distributeFees(uint256 amount) external {
        require(msg.sender == tokenContract, "Unauthorized");
        require(winnersSet, "Winners not set yet");
        require(amount > 0, "Amount must be > 0");
        
        uint256 rewardPerWinner = amount / 5;
        if (rewardPerWinner == 0) return; // Too small to distribute
        
        for (uint256 i = 0; i < 5; i++) {
            pendingRewards[lifetimeWinners[i]] += rewardPerWinner;
        }
        
        totalDistributed += amount;
        emit FeesDistributed(amount);
    }

    function claimRewards() external nonReentrant {
        require(winnersSet, "Winners not set yet");
        require(_isWinner(msg.sender), "Not a lifetime winner");
        
        uint256 amount = pendingRewards[msg.sender];
        require(amount > 0, "No rewards to claim");
        
        pendingRewards[msg.sender] = 0;
        claimedRewards[msg.sender] += amount;
        totalClaimed += amount;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Reward transfer failed");
        
        emit RewardsClaimed(msg.sender, amount);
    }

    function _isWinner(address account) internal view returns (bool) {
        for (uint256 i = 0; i < 5; i++) {
            if (lifetimeWinners[i] == account) {
                return true;
            }
        }
        return false;
    }

    function getPendingRewards(address winner) external view returns (uint256) {
        return pendingRewards[winner];
    }

    function getClaimedRewards(address winner) external view returns (uint256) {
        return claimedRewards[winner];
    }

    function getWinners() external view returns (address[5] memory) {
        return lifetimeWinners;
    }}
