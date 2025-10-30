// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";

enum Outcome { Open, Yes, No }

// Struct to hold details of a single bet WITH reputation tracking
struct Bet {
    address user;
    uint amount;
    uint reputationAtBet; // Store the user's reputation when they placed this bet
}

contract PredictionMarket is ERC1155, Ownable {

    struct Market {
        uint id;
        string question;
        address arbitrator;
        uint resolutionDate;
        Outcome outcome;
        uint yesPool;      // Total USDC in YES pool
        uint noPool;       // Total USDC in NO pool
        bool isResolved;
        Bet[] yesBetList;  // Track individual bets for reputation weighting
        Bet[] noBetList;   // Track individual bets for reputation weighting
    }

    Market[] public markets;
    IERC20 public bettingToken;
    mapping(uint => uint) public tokenIdToMarketId;
    mapping(address => uint) public userReputation; // User reputation scores

    constructor(address _tokenAddress, string memory _uri) 
        ERC1155(_uri)
        Ownable(msg.sender)
    {
        bettingToken = IERC20(_tokenAddress);
    }

    // NFT Token ID helpers
    function getYesTokenId(uint _marketId) public pure returns (uint) {
        return _marketId * 2;
    }

    function getNoTokenId(uint _marketId) public pure returns (uint) {
        return (_marketId * 2) + 1;
    }

    function getMarketCount() public view returns (uint) {
        return markets.length;
    }

    function createMarket(string memory _question, address _arbitrator, uint _resolutionDate) public {
        require(_resolutionDate > block.timestamp, "Resolution date must be in the future.");
        uint marketId = markets.length;
        
        Market storage newMarket = markets.push();
        newMarket.id = marketId;
        newMarket.question = _question;
        newMarket.arbitrator = _arbitrator;
        newMarket.resolutionDate = _resolutionDate;
        newMarket.outcome = Outcome.Open;
        newMarket.yesPool = 0;
        newMarket.noPool = 0;
        newMarket.isResolved = false;

        tokenIdToMarketId[getYesTokenId(marketId)] = marketId;
        tokenIdToMarketId[getNoTokenId(marketId)] = marketId;
    }

    function placeBet(uint _marketId, bool _outcome, uint _amount) public {
        require(_marketId < markets.length, "Market does not exist.");
        Market storage market = markets[_marketId];
        
        require(!market.isResolved, "Market is already resolved.");
        require(block.timestamp < market.resolutionDate, "Betting has closed for this market.");
        require(_amount > 0, "Bet amount must be greater than zero.");

        // Transfer USDC from user
        bool success = bettingToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "Token transfer failed. Did you approve?");

        // Get or initialize user reputation
        uint currentReputation = userReputation[msg.sender];
        if (currentReputation == 0) {
            currentReputation = 100; // Default starting score
            userReputation[msg.sender] = currentReputation;
        }

        // Record bet with reputation for weighted calculations
        Bet memory newBet = Bet({
            user: msg.sender,
            amount: _amount,
            reputationAtBet: currentReputation
        });

        // Mint NFT and update pools
        uint tokenIdToMint;
        if (_outcome == true) {
            market.yesPool += _amount;
            market.yesBetList.push(newBet);
            tokenIdToMint = getYesTokenId(_marketId);
        } else {
            market.noPool += _amount;
            market.noBetList.push(newBet);
            tokenIdToMint = getNoTokenId(_marketId);
        }
        
        // Mint NFT representing the bet
        _mint(msg.sender, tokenIdToMint, _amount, "");
    }

    // Calculate total weighted YES votes
    function getTotalWeightedYes(uint _marketId) public view returns (uint weightedTotal) {
        require(_marketId < markets.length, "Market does not exist.");
        Market storage market = markets[_marketId];
        weightedTotal = 0;
        for (uint i = 0; i < market.yesBetList.length; i++) {
            weightedTotal += market.yesBetList[i].amount * market.yesBetList[i].reputationAtBet;
        }
        return weightedTotal;
    }

    // Calculate total weighted NO votes
    function getTotalWeightedNo(uint _marketId) public view returns (uint weightedTotal) {
        require(_marketId < markets.length, "Market does not exist.");
        Market storage market = markets[_marketId];
        weightedTotal = 0;
        for (uint i = 0; i < market.noBetList.length; i++) {
            weightedTotal += market.noBetList[i].amount * market.noBetList[i].reputationAtBet;
        }
        return weightedTotal;
    }

    // Get user's total bets on a market
    function getUserBet(uint _marketId, address _user) public view returns(uint yesBetTotal, uint noBetTotal) {
        require(_marketId < markets.length, "Market does not exist.");
        Market storage market = markets[_marketId];
        
        uint totalYes = 0;
        for (uint i = 0; i < market.yesBetList.length; i++) {
            if (market.yesBetList[i].user == _user) {
                totalYes += market.yesBetList[i].amount;
            }
        }

        uint totalNo = 0;
        for (uint i = 0; i < market.noBetList.length; i++) {
            if (market.noBetList[i].user == _user) {
                totalNo += market.noBetList[i].amount;
            }
        }

        return (totalYes, totalNo);
    }

    function resolveMarket(uint _marketId, bool _winningOutcome) public {
        Market storage market = markets[_marketId];
        require(msg.sender == market.arbitrator, "Only the arbitrator can resolve.");
        require(!market.isResolved, "Market is already resolved.");

        market.isResolved = true;
        if (_winningOutcome == true) {
            market.outcome = Outcome.Yes;
        } else {
            market.outcome = Outcome.No;
        }

        // Update reputations
        uint reputationGain = 5;
        uint reputationLoss = 2;

        if (market.outcome == Outcome.Yes) {
            // YES bettors won
            for (uint i = 0; i < market.yesBetList.length; i++) {
                address winner = market.yesBetList[i].user;
                userReputation[winner] += reputationGain;
            }
            // NO bettors lost
            for (uint i = 0; i < market.noBetList.length; i++) {
                address loser = market.noBetList[i].user;
                if (userReputation[loser] >= reputationLoss) {
                    userReputation[loser] -= reputationLoss;
                } else {
                    userReputation[loser] = 0;
                }
            }
        } else {
            // NO bettors won
            for (uint i = 0; i < market.noBetList.length; i++) {
                address winner = market.noBetList[i].user;
                userReputation[winner] += reputationGain;
            }
            // YES bettors lost
            for (uint i = 0; i < market.yesBetList.length; i++) {
                address loser = market.yesBetList[i].user;
                if (userReputation[loser] >= reputationLoss) {
                    userReputation[loser] -= reputationLoss;
                } else {
                    userReputation[loser] = 0;
                }
            }
        }
    }

    function withdraw(uint _marketId) public {
        Market storage market = markets[_marketId];
        require(market.isResolved, "Market is not resolved.");
        
        uint tokenIdToRedeem;
        uint totalWinningTokens;
        uint losingPool;

        if (market.outcome == Outcome.Yes) {
            tokenIdToRedeem = getYesTokenId(_marketId);
            totalWinningTokens = market.yesPool; 
            losingPool = market.noPool;
        } else if (market.outcome == Outcome.No) {
            tokenIdToRedeem = getNoTokenId(_marketId);
            totalWinningTokens = market.noPool;
            losingPool = market.yesPool;
        } else {
            revert("Market is not resolved to Yes or No.");
        }

        // Get user's NFT balance (represents their total bet)
        uint userTokenBalance = balanceOf(msg.sender, tokenIdToRedeem);
        require(userTokenBalance > 0, "You have no winning tokens to redeem.");

        // Calculate profit share
        uint profit = 0;
        if (losingPool > 0 && totalWinningTokens > 0) {
            profit = (userTokenBalance * losingPool) / totalWinningTokens;
        }

        // Total payout = original stake + profit
        uint payout = userTokenBalance + profit;

        // Burn the winning NFTs
        _burn(msg.sender, tokenIdToRedeem, userTokenBalance);
        
        // Send payout
        bool success = bettingToken.transfer(msg.sender, payout);
        require(success, "Token withdrawal failed.");
    }
}