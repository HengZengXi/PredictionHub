import React from 'react';
import { useContractRead } from 'wagmi';
import { contractAddress, contractABI } from '../constants';
import './Reputation.css';

function ReputationDisplay({ userAddress, compact = false }) {
  // Read user's reputation from smart contract
  const { data: reputation } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'userReputation',
    args: [userAddress],
    enabled: Boolean(userAddress),
    watch: true,
  });

  const reputationScore = reputation ? Number(reputation) : 100; // Default 100 if no data

  // Determine reputation level
  const getReputationLevel = (score) => {
    if (score >= 150) return { level: 'Expert', color: '#f59e0b', icon: '🏆' };
    if (score >= 120) return { level: 'Advanced', color: '#10b981', icon: '⭐' };
    if (score >= 100) return { level: 'Intermediate', color: '#6366f1', icon: '📈' };
    if (score >= 80) return { level: 'Beginner', color: '#8b5cf6', icon: '🎯' };
    return { level: 'Novice', color: '#64748b', icon: '🌱' };
  };

  const { level, color, icon } = getReputationLevel(reputationScore);

  if (compact) {
    // Compact version for navbar - with level
    return (
      <div className="reputation-badge-compact" style={{ borderColor: color }}>
        <span className="rep-icon">{icon}</span>
        <div className="rep-info-compact">
          <span className="rep-score-compact">{reputationScore} Points</span>
          <span className="rep-level-compact" style={{ color }}>{level}</span>
        </div>
      </div>
    );
  }

  // Full version for profile/expanded view
  return (
    <div className="reputation-display" style={{ borderColor: color }}>
      <div className="reputation-header">
        <span className="reputation-icon">{icon}</span>
        <div className="reputation-info">
          <div className="reputation-level" style={{ color }}>{level}</div>
          <div className="reputation-score">{reputationScore} Points</div>
        </div>
      </div>
      
      <div className="reputation-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${Math.min((reputationScore / 200) * 100, 100)}%`,
              background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
            }}
          ></div>
        </div>
        <div className="progress-text">
          {reputationScore < 200 ? `${200 - reputationScore} points to next level` : 'Max level reached!'}
        </div>
      </div>

      <div className="reputation-explainer">
        <div className="explainer-item">
          <span className="explainer-icon">✅</span>
          <span className="explainer-text">Win bets: +5 points</span>
        </div>
        <div className="explainer-item">
          <span className="explainer-icon">❌</span>
          <span className="explainer-text">Lose bets: -2 points</span>
        </div>
      </div>
    </div>
  );
}

export default ReputationDisplay;