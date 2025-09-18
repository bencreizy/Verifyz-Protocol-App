
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Rewards
 * @dev General rewards distribution for community incentives and airdrops
 * Separate from lifetime rewards which are handled by RewardsDistributor
 */
contract Rewards is Ownable {
    using SafeERC20 for IERC20;
    IERC20 public rewardToken;

    event RewardDistributed(address indexed to, uint256 amount);
    event BatchRewardsDistributed(address[] recipients, uint256[] amounts);

    constructor(address tokenAddress) Ownable(msg.sender) {
        rewardToken = IERC20(tokenAddress);
    }

    function distributeReward(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");

        rewardToken.safeTransfer(to, amount);

        emit RewardDistributed(to, amount);
    }

    function batchDistributeRewards(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "No recipients");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid address");
            require(amounts[i] > 0, "Invalid amount");
            
            bool success = rewardToken.transfer(recipients[i], amounts[i]);
            require(success, "Transfer failed");
        }

        emit BatchRewardsDistributed(recipients, amounts);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        bool success = rewardToken.transfer(owner(), amount);
        require(success, "Withdraw failed");
    }

    function getBalance() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }
}
