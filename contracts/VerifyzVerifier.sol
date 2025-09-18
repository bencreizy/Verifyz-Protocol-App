
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IRewardsDistributor {
    function distributeFees(uint256 amount) external;
}

/**
 * @title VerifyzVerifier (VFZ Token)
 * @dev ERC20 token with 5% transaction fees as per whitepaper
 * Total Supply: 500M tokens
 * Fee Structure: 5% per transaction
 * - 1% to 5 lifetime reward winners
 * - 4% to project treasury
 */
contract VerifyzVerifier is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant TOTAL_SUPPLY = 500_000_000 * 10**18; // 500M tokens
    uint256 public constant FEE_PERCENTAGE = 5; // 5% transaction fee
    uint256 public constant REWARD_WINNERS_FEE = 1; // 1% to winners
    uint256 public constant TREASURY_FEE = 4; // 4% to treasury

    address public rewardsDistributor;
    address public treasury;
    bool public feesEnabled = false;
    
    // Exempted addresses (presale contract, etc.)
    mapping(address => bool) public feeExempt;

    event FeesEnabled(bool enabled);
    event RewardsDistributorSet(address indexed distributor);
    event TreasurySet(address indexed treasury);
    event FeeExemptionSet(address indexed account, bool exempt);

    constructor(
        string memory name_,
        string memory symbol_,
        address treasury_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        treasury = treasury_;
        _mint(msg.sender, TOTAL_SUPPLY);
        
        // Owner is fee exempt by default
        feeExempt[msg.sender] = true;
    }

    function setRewardsDistributor(address _rewardsDistributor) external onlyOwner {
        require(_rewardsDistributor != address(0), "Invalid address");
        rewardsDistributor = _rewardsDistributor;
        feeExempt[_rewardsDistributor] = true;
        emit RewardsDistributorSet(_rewardsDistributor);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid address");
        treasury = _treasury;
        emit TreasurySet(_treasury);
    }

    function setFeesEnabled(bool _enabled) external onlyOwner {
        feesEnabled = _enabled;
        emit FeesEnabled(_enabled);
    }

    function setFeeExemption(address account, bool exempt) external onlyOwner {
        feeExempt[account] = exempt;
        emit FeeExemptionSet(account, exempt);
    }

    function _update(address from, address to, uint256 amount) internal override {
        // Handle fee logic only for transfers (not mints or burns)
        if (from != address(0) && to != address(0) && feesEnabled && !feeExempt[from] && !feeExempt[to]) {
            uint256 feeAmount = (amount * FEE_PERCENTAGE) / 100;
            uint256 transferAmount = amount - feeAmount;

            if (feeAmount > 0) {
                // 1% to rewards distributor for lifetime winners
                uint256 rewardsAmount = (amount * REWARD_WINNERS_FEE) / 100;
                // 4% to treasury
                uint256 treasuryAmount = feeAmount - rewardsAmount;

                if (rewardsDistributor != address(0) && rewardsAmount > 0) {
                    super._update(from, rewardsDistributor, rewardsAmount);
                    IRewardsDistributor(rewardsDistributor).distributeFees(rewardsAmount);
                } else {
                    // If distributor not set, send to treasury
                    treasuryAmount += rewardsAmount;
                }

                if (treasuryAmount > 0) {
                    super._update(from, treasury, treasuryAmount);
                }
                
                // Transfer the net amount to recipient
                super._update(from, to, transferAmount);
            } else {
                super._update(from, to, amount);
            }
        } else {
            // No fees for mints, burns, or exempted addresses
            super._update(from, to, amount);
        }
    }
}
