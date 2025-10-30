import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { contractAddress, contractABI } from '../constants';
import './Reputation.css';

function ReputationLeaderboard({ markets, currentUserAddress }) {
  const [leaderboard, setLeaderboard] = useState([]);

  // FIXED: Add proper dependency tracking
  useEffect(() => {
    // Only update if we have a current user
    if (!currentUserAddress) {
      setLeaderboard([]);
      return;
    }

    // Create leaderboard with current user
    const newLeaderboard = [{
      address: currentUserAddress,
      reputation: 0,
      isCurrentUser: true
    }];

    // Only update if actually different
    if (JSON.stringify(newLeaderboard) !== JSON.stringify(leaderboard)) {
      setLeaderboard(newLeaderboard);
    }
  }, [currentUserAddress]); // Remove 'markets' and 'leaderboard' from dependencies

  // Component to fetch and display individual user reputation
  const LeaderboardRow = ({ userAddress, rank, isCurrentUser }) => {
    const { data: reputation } = useContractRead({
      address: contractAddress,
      abi: contractABI,
      functionName: 'userReputation',
      args: [userAddress],
      enabled: Boolean(userAddress),
      watch: true,
    });

    const reputationScore = reputation ? Number(reputation) : 100;

    return (
      <div className={`leaderboard-item ${isCurrentUser ? 'current-user' : ''}`}>
        <div className={`leaderboard-rank rank-${rank}`}>
          {rank === 1 && '🥇'}
          {rank === 2 && '🥈'}
          {rank === 3 && '🥉'}
          {rank > 3 && `#${rank}`}
        </div>
        <div className="leaderboard-address">
          {userAddress.substring(0, 6)}...{userAddress.substring(userAddress.length - 4)}
          {isCurrentUser && <span className="you-badge">YOU</span>}
        </div>
        <div className="leaderboard-score">
          <div className="score-value">{reputationScore}</div>
          <div className="score-label">Points</div>
        </div>
      </div>
    );
  };

  // If no users to display
  if (leaderboard.length === 0) {
    return (
      <div className="leaderboard-section">
        <h2 className="leaderboard-title">
          <span>🏆</span> Top Predictors
        </h2>
        <div className="empty-leaderboard">
          <div className="empty-leaderboard-icon">📊</div>
          <p>No reputation data yet. Start betting to appear on the leaderboard!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-section">
      <h2 className="leaderboard-title">
        <span>🏆</span> Top Predictors
      </h2>
      <div className="leaderboard-list">
        {leaderboard.map((user, index) => (
          <LeaderboardRow
            key={user.address}
            userAddress={user.address}
            rank={index + 1}
            isCurrentUser={user.isCurrentUser}
          />
        ))}
      </div>
      <div className="leaderboard-note">
        <span className="note-icon">💡</span>
        <span>Higher reputation means your bets have more voting power!</span>
      </div>
    </div>
  );
}

export default ReputationLeaderboard;