
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

interface IVerifyzVerifier {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8);
}

interface IRewardsDistributor {
    function setLifetimeWinners(address[5] calldata winners) external;
}

/**
 * @title Presale
 * @dev Enhanced token presale for Verifyz Protocol with VRF winner selection
 * As per whitepaper: 35% of total supply (175M tokens) for presale
 * 5 random winners selected via Chainlink VRF for lifetime rewards
 */
contract Presale is Ownable, ReentrancyGuard, VRFConsumerBaseV2 {
    using SafeERC20 for IERC20;

    IVerifyzVerifier public token;
    IRewardsDistributor public rewardsDistributor;
    
    // Presale parameters
    uint256 public constant PRESALE_ALLOCATION = 175_000_000 * 10**18; // 35% of 500M
    uint256 public price; // price per token in wei
    uint256 public duration; // presale duration in seconds
    uint256 public presaleStartTime;
    uint256 public presaleEndTime;
    uint256 public totalTokensSold;
    uint256 public totalRaised;
    bool public hasStarted;
    bool public hasEnded;
    bool public winnersSelected;

    // Caps and limits
    uint256 public hardCap;
    uint256 public softCap;
    bool public softCapReached;
    bool public hardCapReached;

    // VRF for random winner selection
    VRFCoordinatorV2Interface internal COORDINATOR;
    bytes32 internal keyHash;
    uint64 internal subscriptionId;
    uint32 internal callbackGasLimit;
    uint16 internal requestConfirmations;
    uint32 internal numWords;
    uint256 public randomSeed;
    address[5] public winners;
    
    // Participant tracking
    address[] public participants;
    mapping(address => uint256) public contributions;
    mapping(address => bool) public hasContributed;
    mapping(address => bool) public tokensClaimed;

    // Vesting - 25% TGE, remainder over 6 months
    uint256 public constant TGE_PERCENTAGE = 25; // 25% at Token Generation Event
    uint256 public constant VESTING_DURATION = 180 days; // 6 months
    uint256 public tgeTime;
    mapping(address => uint256) public claimedTokens;

    event PresaleStarted(uint256 startTime, uint256 endTime);
    event PresaleEnded();
    event Contributed(address indexed contributor, uint256 amount, uint256 tokens);
    event WinnersRequested(bytes32 requestId);
    event WinnersSelected(address[5] winners);
    event TokensClaimed(address indexed claimer, uint256 amount);
    event Refund(address indexed contributor, uint256 amount);

    constructor(
        address tokenAddress,
        address rewardsDistributorAddress,
        address owner,
        uint256 _price,
        uint256 _duration,
        address _vrfCoordinator,
        uint64 _subscriptionId,
        bytes32 _keyHash,
        uint32 _callbackGasLimit,
        uint16 _requestConfirmations,
        uint32 _numWords
    )
        Ownable(owner)
        VRFConsumerBaseV2(_vrfCoordinator)
    {
        token = IVerifyzVerifier(tokenAddress);
        rewardsDistributor = IRewardsDistributor(rewardsDistributorAddress);
        price = _price;
        duration = _duration;
        
        // VRF v2 setup
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        callbackGasLimit = _callbackGasLimit;
        requestConfirmations = _requestConfirmations;
        numWords = _numWords;

        // Default caps (can be updated by owner)
        hardCap = 1000 * 10**18; // 1000 ETH
        softCap = 100 * 10**18;  // 100 ETH
        
        hasStarted = false;
        hasEnded = false;
        winnersSelected = false;
        totalTokensSold = 0;
        totalRaised = 0;
    }

    function startPresale() external onlyOwner {
        require(!hasStarted, "Presale already started");
        hasStarted = true;
        presaleStartTime = block.timestamp;
        presaleEndTime = block.timestamp + duration;
        emit PresaleStarted(presaleStartTime, presaleEndTime);
    }

    function contribute() external payable nonReentrant {
        require(hasStarted, "Presale not started");
        require(block.timestamp <= presaleEndTime, "Presale has ended");
        require(!hardCapReached, "Hard cap reached");
        require(msg.value > 0, "Must send ETH");

        uint256 newTotalRaised = totalRaised + msg.value;
        require(newTotalRaised <= hardCap, "Contribution exceeds hard cap");

        // Calculate tokens to be allocated
        uint256 tokenAmount = (msg.value * 1e18) / price;
        require(totalTokensSold + tokenAmount <= PRESALE_ALLOCATION, "Not enough tokens available");

        // Add to participants if first contribution
        if (!hasContributed[msg.sender]) {
            participants.push(msg.sender);
            hasContributed[msg.sender] = true;
        }

        contributions[msg.sender] += msg.value;
        totalTokensSold += tokenAmount;
        totalRaised = newTotalRaised;

        emit Contributed(msg.sender, msg.value, tokenAmount);

        // Check caps
        if (totalRaised >= hardCap) {
            hardCapReached = true;
            _endPresale();
        } else if (totalRaised >= softCap && !softCapReached) {
            softCapReached = true;
        }
    }

    function endPresale() external onlyOwner {
        require(hasStarted, "Presale not started");
        require(block.timestamp >= presaleEndTime || hardCapReached, "Cannot end presale yet");
        _endPresale();
    }

    function _endPresale() internal {
        if (!hasEnded) {
            hasEnded = true;
            hasStarted = false;
            emit PresaleEnded();
            
            // Set TGE time for vesting
            tgeTime = block.timestamp;
            
            // Request VRF for winner selection if we have enough participants
            if (participants.length >= 5 && softCapReached) {
                _requestWinners();
            }
        }
    }

    function _requestWinners() internal {
        uint256 requestId_ = COORDINATOR.requestRandomWords(
            keyHash,
            subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        emit WinnersRequested(bytes32(requestId_));
    }

    function fulfillRandomWords(uint256 /*requestId_*/, uint256[] memory randomWords) internal override {
        randomSeed = randomWords[0];
        _selectWinners(randomness);
    }

    function _selectWinners(uint256 seed) internal {
        require(participants.length >= 5, "Not enough participants");
        require(!winnersSelected, "Winners already selected");
        
        uint256 participantCount = participants.length;
        bool[5] memory selectedIndices;
        
        for (uint256 i = 0; i < 5; i++) {
            uint256 randomIndex;
            do {
                seed = uint256(keccak256(abi.encode(seed, i)));
                randomIndex = seed % participantCount;
            } while (selectedIndices[randomIndex]);
            
            selectedIndices[randomIndex] = true;
            winners[i] = participants[randomIndex];
        }
        
        winnersSelected = true;
        rewardsDistributor.setLifetimeWinners(winners);
        emit WinnersSelected(winners);
    }

    // Manual winner selection fallback (if VRF fails)
    function selectWinnersManually(uint256 seed) external onlyOwner {
        require(hasEnded, "Presale not ended");
        require(!winnersSelected, "Winners already selected");
        require(participants.length >= 5, "Not enough participants");
        _selectWinners(seed);
    }

    function claimTokens() external nonReentrant {
        require(hasEnded, "Presale not ended");
        require(softCapReached, "Soft cap not reached");
        require(contributions[msg.sender] > 0, "No contribution found");

        uint256 totalTokens = (contributions[msg.sender] * 1e18) / price;
        uint256 availableTokens = getClaimableTokens(msg.sender);
        
        require(availableTokens > 0, "No tokens available to claim");

        claimedTokens[msg.sender] += availableTokens;
        IERC20(address(token)).safeTransfer(msg.sender, availableTokens);
        
        emit TokensClaimed(msg.sender, availableTokens);
    }

    function getClaimableTokens(address contributor) public view returns (uint256) {
        if (!hasEnded || !softCapReached || contributions[contributor] == 0) {
            return 0;
        }

        uint256 totalTokens = (contributions[contributor] * 1e18) / price;
        uint256 tgeTokens = (totalTokens * TGE_PERCENTAGE) / 100;
        uint256 vestedTokens = 0;

        if (block.timestamp > tgeTime) {
            uint256 timeSinceTGE = block.timestamp - tgeTime;
            if (timeSinceTGE >= VESTING_DURATION) {
                vestedTokens = totalTokens - tgeTokens;
            } else {
                vestedTokens = ((totalTokens - tgeTokens) * timeSinceTGE) / VESTING_DURATION;
            }
        }

        uint256 totalAvailable = tgeTokens + vestedTokens;
        return totalAvailable - claimedTokens[contributor];
    }

    function getRefund() external nonReentrant {
        require(hasEnded, "Presale not ended");
        require(!softCapReached, "Soft cap was reached, no refunds");
        
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contribution to refund");
        
        contributions[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Refund failed");
        
        emit Refund(msg.sender, amount);
    }

    // Owner functions
    function setPrice(uint256 newPrice) external onlyOwner {
        require(!hasStarted, "Cannot change price after start");
        price = newPrice;
    }

    function setCaps(uint256 _softCap, uint256 _hardCap) external onlyOwner {
        require(!hasStarted, "Cannot change caps after start");
        require(_softCap <= _hardCap, "Soft cap must be <= hard cap");
        softCap = _softCap;
        hardCap = _hardCap;
    }

    function withdrawETH() external onlyOwner {
        require(hasEnded, "Presale not ended");
        require(softCapReached, "Soft cap not reached");
        
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function withdrawUnsoldTokens() external onlyOwner {
        require(hasEnded, "Presale not ended");
        
        uint256 unsoldTokens = PRESALE_ALLOCATION - totalTokensSold;
        if (unsoldTokens > 0) {
            IERC20(address(token)).safeTransfer(owner(), unsoldTokens);
        }
    }

    function withdrawLink() external onlyOwner {
        LINK.transfer(owner(), LINK.balanceOf(address(this)));
    }

    // View functions
    function getParticipantCount() external view returns (uint256) {
        return participants.length;
    }

    function getWinners() external view returns (address[5] memory) {
        return winners;
    }
}
