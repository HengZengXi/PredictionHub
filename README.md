# 🎯 **PredictHub**

> A decentralized prediction market dApp where your **reputation and skill** matter more than the size of your wallet.

---

## 🌟 Overview

**PredictHub** re-imagines prediction markets by introducing two key features:  
**Reputation-Weighted Voting** and **NFT Bet Receipts.**

Market odds are determined by **Voting Power = Bet Amount × Reputation Score**,  
giving expert predictors more influence.

---

## ✨ **Core Features**

### 🧮 Reputation-Weighted Voting
The market's *"YES"* vs. *"NO"* odds are **not based on raw USDC pool sizes**.  
They are calculated using a **Voting Power formula**, which:
- Prevents whales from manipulating markets.
- Rewards users with a history of accurate predictions.

---

### 🎫 NFT Bet Receipts (ERC-1155)
When you place a bet, you **mint an ERC-1155 NFT** representing your position  
(e.g., `"10 USDC for YES on Market #5"`).

---

### 💰 Claim Winnings by Redeeming NFTs
- If you **win**, redeem your NFT to claim winnings (NFT is burned).  
- If you **lose**, the NFT remains in your wallet as a **collectible losing slip**.

---

### 🧠 Dynamic Reputation System
- Users start with **100 reputation**.  
- **+5 points** for a win, **–2 points** for a loss.  
- Reputation is displayed as a **wallet badge** and affects future voting power.

---

### 🏗️ Create & Resolve Markets
- Any user can create a new market.
- Creator defines:
  - **Question**
  - **Resolution date**
  - **Arbitrator** wallet address (responsible for resolution).

---

### 💻 Modern dApp Interface
Built with **React**, **Wagmi**, and **Viem** for a seamless, fast, and responsive UX  
on the **Sepolia Testnet**.

---

## 🚀 **How It Works: The Key Concepts**

### ⚡ 1. The Reputation-Weighted Engine

In a normal market:
> User A bets \$10 on "YES" and User B bets \$10 on "NO" → 50/50 odds.

In **PredictHub**, *reputation acts as a multiplier.*

#### Example

| User | Reputation | Bet | Voting Power |
|------|-------------|-----|---------------|
| 👤 **User A (Expert)** | 150 | 10 USDC | 1,500 |
| 👤 **User B (Beginner)** | 98 | 10 USDC | 980 |

**Total Voting Power:** 2,480  
- “YES” Probability: **(1,500 / 2,480) ≈ 60%**  
- “NO” Probability: **(980 / 2,480) ≈ 40%**

✅ **Result:** Market odds reflect predictor skill, not wallet size.

---

### 🎟️ 2. The NFT Bet Receipt Lifecycle

Your bet is not just a number — it’s a **token you own**.

#### 🔹 MINT
You bet 10 USDC on “YES” in Market #1 → receive a Market #1 “YES” NFT.

#### 🔹 RESOLVE
Arbitrator resolves Market #1 → outcome “YES”.

#### 🔹 CLAIM (Winner)
Redeem your “YES” NFT to claim winnings → NFT is **burned**.

#### 🔹 HOLD (Loser)
If resolved “NO”, your “YES” NFT becomes **valueless** — remains as a collectible.

---

## 🛠️ **Tech Stack**

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React, CSS |
| **Web3** | Wagmi (React Hooks), Viem, Ethers.js |
| **Wallet** | MetaMask |
| **Blockchain** | Ethereum Sepolia Testnet |
| **Smart Contract** | Solidity (ERC-1155) |

---

## 🏁 **Getting Started & Testing**

You can run this dApp locally to test all features.

### 1️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/HengZengXi/PredictionHub.git

# Install dependencies
npm install --legacy-peer-deps

# Start the application
npm start
