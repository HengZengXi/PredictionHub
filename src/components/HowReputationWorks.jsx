import React from 'react';
import './Reputation.css';

function HowReputationWorks() {
  return (
    <div className="how-reputation-works">
      <h2 className="reputation-tutorial-title">
        How Reputation Works
      </h2>

      <div className="tutorial-grid">
        {/* Card 1: Starting Reputation */}
        <div className="tutorial-card">
          <span className="tutorial-icon">🌱</span>
          <h3 className="tutorial-title">Starting Out</h3>
          <p className="tutorial-description">
            Every user starts with <strong>100 reputation points</strong> when they place their first bet.
          </p>
        </div>

        {/* Card 2: Winning Bets */}
        <div className="tutorial-card">
          <span className="tutorial-icon">✅</span>
          <h3 className="tutorial-title">Win Bets</h3>
          <p className="tutorial-description">
            Each time you bet on the correct outcome, you gain <strong>+5 reputation points</strong>.
          </p>
        </div>

        {/* Card 3: Losing Bets */}
        <div className="tutorial-card">
          <span className="tutorial-icon">❌</span>
          <h3 className="tutorial-title">Lose Bets</h3>
          <p className="tutorial-description">
            Incorrect predictions reduce your reputation by <strong>-2 points</strong> (minimum 0).
          </p>
        </div>

        {/* Card 4: Voting Power */}
        <div className="tutorial-card">
          <span className="tutorial-icon">⚡</span>
          <h3 className="tutorial-title">Voting Power</h3>
          <p className="tutorial-description">
            Your reputation <strong>multiplies your bet</strong> to determine market probabilities.
          </p>
        </div>
      </div>

      {/* Example Calculation */}
      <div className="example-box">
        <div className="example-title">
          <span>📊</span> Example: How Reputation Affects Outcomes
        </div>
        <div className="example-content">
          <p style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>
            Two users bet on the same market. Even though they bet the same amount, their voting power is different:
          </p>

          {/* User 1 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#a5b4fc', fontWeight: '700', marginBottom: '0.5rem' }}>
              👤 User A (Expert Predictor):
            </div>
            <div className="example-calculation">
              <span>10 USDC</span>
              <span className="calc-highlight">×</span>
              <span className="calc-highlight">150 Rep</span>
              <span>=</span>
              <span className="calc-result">1,500 Voting Power</span>
            </div>
          </div>

          {/* User 2 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#a5b4fc', fontWeight: '700', marginBottom: '0.5rem' }}>
              👤 User B (Beginner):
            </div>
            <div className="example-calculation">
              <span>10 USDC</span>
              <span className="calc-highlight">×</span>
              <span className="calc-highlight">80 Rep</span>
              <span>=</span>
              <span className="calc-result">800 Voting Power</span>
            </div>
          </div>

          {/* Result */}
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.15)', 
            padding: '1.25rem', 
            borderRadius: '10px',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            marginTop: '1.5rem'
          }}>
            <div style={{ color: '#6ee7b7', fontWeight: '700', marginBottom: '0.5rem' }}>
              📈 Market Probability Calculation:
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.8' }}>
              User A's voting power: 1,500<br />
              User B's voting power: 800<br />
              Total voting power: 2,300<br /><br />
              <strong style={{ color: '#10b981' }}>
                Probability = 1,500 / 2,300 = 65% (weighted by reputation!)
              </strong>
            </div>
          </div>

          <div style={{ 
            marginTop: '1.5rem', 
            fontSize: '0.9rem', 
            color: '#94a3b8',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            💡 Expert predictors have more influence on market probabilities, even with the same bet amount!
          </div>
        </div>
      </div>

      {/* Reputation Levels */}
      <div className="example-box" style={{ marginTop: '2rem' }}>
        <div className="example-title">
          <span>⭐</span> Reputation Levels
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(100, 116, 139, 0.2)', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌱</div>
            <div style={{ fontWeight: '700', color: '#64748b', marginBottom: '0.25rem' }}>Novice</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>0-79 points</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{ fontWeight: '700', color: '#8b5cf6', marginBottom: '0.25rem' }}>Beginner</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>80-99 points</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <div style={{ fontWeight: '700', color: '#6366f1', marginBottom: '0.25rem' }}>Intermediate</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>100-119 points</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontWeight: '700', color: '#10b981', marginBottom: '0.25rem' }}>Advanced</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>120-149 points</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <div style={{ fontWeight: '700', color: '#f59e0b', marginBottom: '0.25rem' }}>Expert</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>150+ points</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowReputationWorks;