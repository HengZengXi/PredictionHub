import React from 'react';
import { useContractRead } from 'wagmi';
import { contractAddress, contractABI } from '../constants';
import './Reputation.css';

function VotingPowerCalculator({ userAddress, betAmount }) {
  // Read user's reputation
  const { data: reputation } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'userReputation',
    args: [userAddress],
    enabled: Boolean(userAddress),
    watch: true,
  });

  const reputationScore = reputation ? Number(reputation) : 100;
  const amount = parseFloat(betAmount) || 0;
  const votingPower = amount * reputationScore;

  // Don't show if no amount entered
  if (amount === 0) return null;

  return (
    <div className="voting-power-card">
      <div className="voting-power-title">
        <span>⚡</span> Your Voting Power
      </div>

      <div className="power-calculation">
        <div className="power-item">
          <div className="power-label">Bet Amount</div>
          <div className="power-value">{amount.toFixed(2)}</div>
        </div>

        <div className="power-operator">×</div>

        <div className="power-item">
          <div className="power-label">Reputation</div>
          <div className="power-value">{reputationScore}</div>
        </div>

        <div className="power-equals">=</div>

        <div className="power-item">
          <div className="power-label">Voting Power</div>
          <div className="power-value power-result">
            {votingPower.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="power-hint">
        💡 Your {reputationScore} reputation multiplies your {amount} USDC bet into {votingPower.toLocaleString()} weighted votes
      </div>
    </div>
  );
}

export default VotingPowerCalculator;