🎯 PredictHub

PredictHub is a decentralized prediction market dApp where your reputation and skill matter more than the size of your wallet.

This application re-imagines prediction markets by introducing two key features: Reputation-Weighted Voting and NFT Bet Receipts. Market odds are determined by Voting Power (Bet Amount x Reputation Score), giving expert predictors more influence.

✨ Core Features
Reputation-Weighted Voting: The market's "YES" vs. "NO" odds are not based on the raw USDC pool. They are calculated using a Voting Power formula. This prevents whales from easily manipulating markets and rewards users who have a history of accurate predictions.

NFT Bet Receipts (ERC-1155): When you place a bet, you mint an ERC-1155 NFT that represents your position (e.g., "10 USDC for YES on Market 5").

Claim Winnings by Redeeming NFTs: If your prediction is correct, you redeem your winning NFTs to claim your share of the prize pool. Losing NFTs remain in your wallet as a valueless collectible "losing bet slip."

Dynamic Reputation System: Users start with 100 reputation. Winning a bet grants +5 points, and losing a bet costs -2 points. Your reputation is displayed on your wallet badge.

Create & Resolve Markets: Any user can create a new market. They must define the question, resolution date, and assign a trusted "Arbitrator" wallet address to resolve the market's outcome.

Modern dApp Interface: Built with React, Wagmi, and Viem for a seamless, fast, and responsive user experience on the Sepolia Testnet.

🚀 How It Works: The Key Concepts
PredictHub has two core mechanics that set it apart.

1. ⚡ The Reputation-Weighted Engine
In a normal prediction market, if User A bets $10 on "YES" and User B bets $10 on "NO", the odds are 50/50.

In PredictHub, reputation acts as a multiplier.

Let's look at an example:

👤 User A (Expert Predictor)

Reputation: 150

Bet: 10 USDC on "YES"

Voting Power: 10 * 150 = 1,500

👤 User B (Beginner)

Reputation: 98

Bet: 10 USDC on "NO"

Voting Power: 10 * 98 = 980

Result: Even though the money is 50/50, the market odds will reflect the skill of the bettors.

Total Voting Power: 1,500 + 980 = 2,480

"YES" Probability: (1,500 / 2,480) = ~60%

"NO" Probability: (980 / 2,480) = ~40%

This system ensures that the market probabilities are more representative of expert consensus, not just of wealth.

2. 🎫 The NFT Bet Receipt Lifecycle
Your bet is not just a number in a contract; it's a token you own.

MINT: You bet 10 USDC on the "YES" outcome of Market #1. The smart contract mints you a Market 1 "YES" Token with a value of 10.

RESOLVE: An Arbitrator resolves the market to "YES".

CLAIM (if you won): Your "YES" Token is now redeemable. You send it to the smart contract's withdraw function and receive your winnings. The NFT is burned.

HOLD (if you lost): If the market resolved to "NO", your "YES" Token becomes valueless. It cannot be redeemed and simply stays in your wallet as a collectible.

🛠️ Tech Stack
Frontend: React, CSS

Web3: Wagmi (React Hooks for Ethereum), Viem (Contract Interaction), Ethers.js

Wallet: MetaMask

Blockchain: Sepolia Testnet

Smart Contract: Solidity (ERC-1155)

🏁 Getting Started & How to Test
You can run this dApp locally to test all the features.

1. Installation
Bash

# 1. Clone the repository
git clone [https://github.com/HengZengXi/PredictionHub.git](https://github.com/HengZengXi/PredictionHub.git)

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the application
npm start
The app will be running on http://localhost:3000.

2. How to Test the Full dApp Flow
To test this properly, you will need a MetaMask wallet and some Sepolia testnet tokens.

Prerequisites:

Sepolia ETH (for Gas): Get free test ETH from a faucet like Alchemy's Sepolia Faucet or Google Cloud's Faucet.

Sepolia USDC (for Betting): This project uses the official Circle USDC token on Sepolia.

Go to: Circle's USDC Faucet

Token Address: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238

Test Walkthrough:

Create a Market:

Connect your wallet.

Go to the "✨ Create New Market" section.

Fill in a question (e.g., "Will I test this?").

In the "⚖️ Arbitrator Address" field, paste your own wallet address. This is crucial for testing.

Click "Create Market" and confirm the transaction.

Place a Bet:

Go to the "🔥 Active Markets" section and find your new market.

Click "Place Your Bet".

Enter an amount (e.g., 10 USDC) and click "Approve". Confirm in MetaMask.

After approval, click "Bet YES" and confirm again.

Resolve the Market:

On the same market card, you should see the "⚙️ Arbitrator Controls" (because you are the arbitrator).

Click "Resolve YES" (or whichever side you bet on) and confirm the transaction.

Claim Your Winnings:

Go to the "✅ Resolved Markets" section.

Find your market. You will now see the "🎉 You Won!" message.

Click "💰 Redeem  Winnings" and confirm the transaction.

Your winnings will be sent to your wallet, and the "You Won" section will disappear.
