
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Staking
 * @dev Staking contract for Verifyz Protocol tokens
 * Allows users to stake VFZ tokens and earn rewards
 */
contract Staking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    IERC20 public stakingToken;
    uint256 public rewardRate; // reward tokens per second per token staked
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public totalStaked;

    struct UserInfo {
        uint256 amount;
        uint256 rewardPerTokenPaid;
        uint256 rewards;
        uint256 lastStakeTime;
    }

    mapping(address => UserInfo) public userInfo;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 newRate);

    constructor(address tokenAddress, uint256 _rewardRate) Ownable(msg.sender) {
        stakingToken = IERC20(tokenAddress);
        rewardRate = _rewardRate;
        lastUpdateTime = block.timestamp;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            UserInfo storage user = userInfo[account];
            user.rewards = earned(account);
            user.rewardPerTokenPaid = rewardPerTokenStored;
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + 
               (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalStaked);
    }

    function earned(address account) public view returns (uint256) {
        UserInfo memory user = userInfo[account];
        return ((user.amount * (rewardPerToken() - user.rewardPerTokenPaid)) / 1e18) + user.rewards;
    }

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be > 0");
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);

        UserInfo storage user = userInfo[msg.sender];
        user.amount += amount;
        user.lastStakeTime = block.timestamp;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= amount, "Insufficient staked amount");
        require(amount > 0, "Amount must be > 0");

        user.amount -= amount;
        totalStaked -= amount;

        stakingToken.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external nonReentrant updateReward(msg.sender) {
        UserInfo storage user = userInfo[msg.sender];
        uint256 reward = user.rewards;
        require(reward > 0, "No rewards to claim");

        user.rewards = 0;
        stakingToken.safeTransfer(msg.sender, reward);

        emit RewardsClaimed(msg.sender, reward);
    }

    function exit() external nonReentrant updateReward(msg.sender) {
        UserInfo storage user = userInfo[msg.sender];
        
        uint256 stakedAmount = user.amount;
        uint256 reward = user.rewards;
        
        if (stakedAmount > 0) {
            user.amount = 0;
            totalStaked -= stakedAmount;
            stakingToken.safeTransfer(msg.sender, stakedAmount);
            emit Unstaked(msg.sender, stakedAmount);
        }
        
        if (reward > 0) {
            user.rewards = 0;
            stakingToken.safeTransfer(msg.sender, reward);
            emit RewardsClaimed(msg.sender, reward);
        }
    }

    // Owner functions
    function setRewardRate(uint256 _rate) external onlyOwner updateReward(address(0)) {
        rewardRate = _rate;
        emit RewardRateUpdated(_rate);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        stakingToken.safeTransfer(owner(), amount);
    }

    function addRewards(uint256 amount) external onlyOwner {
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    // View functions
    function getStakedAmount(address account) external view returns (uint256) {
        return userInfo[account].amount;
    }

    function getRewardBalance() external view returns (uint256) {
        return stakingToken.balanceOf(address(this)) - totalStaked;
    }
}
