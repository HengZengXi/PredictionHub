import React, { useState, useEffect } from 'react';
import './MarketCard.css';
import VotingPowerCalculator from './VotingPowerCalculator';
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { contractAddress, contractABI, tokenAddress, tokenABI } from '../constants';
import { parseUnits, formatUnits } from 'viem';

function MarketCard({
  id, question, date, yesBets, noBets, arbitrator, outcome, userAddress,
  weightedYes, weightedNo, isResolved
}) {
  const [betAmount, setBetAmount] = useState('');
  const [showBetting, setShowBetting] = useState(false);

  const betAmountParsed = betAmount ? parseUnits(betAmount, 6) : 0n;

  // Manual reset function
  const resetBettingForm = () => {
    setBetAmount('');
    setShowBetting(false);
  };

  // --- Read Token Allowance  ---
  const { data: allowanceData } = useContractRead({
    address: tokenAddress,
    abi: tokenABI,
    functionName: 'allowance',
    args: [userAddress, contractAddress],
    enabled: Boolean(userAddress),
    watch: true,
  });

  // Treat allowance as 0n if undefined
  const allowance = allowanceData ?? 0n;

  // --- "Approve" Token Hook ---
  const { config: configApprove } = usePrepareContractWrite({
    address: tokenAddress,
    abi: tokenABI,
    functionName: 'approve',
    args: [contractAddress, betAmountParsed],
    enabled: Boolean(betAmountParsed > 0n),
  });
  const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove, write: writeApprove } = useContractWrite(configApprove);

  // --- "Bet" Hooks ---
  const { config: configYes } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'placeBet',
    args: [id, true, betAmountParsed],
    enabled: Boolean(betAmountParsed > 0n && allowance >= betAmountParsed),
  });
  const { isLoading: isLoadingYes, isSuccess: isSuccessYes, write: writeYes } = useContractWrite(configYes);

  const { config: configNo } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'placeBet',
    args: [id, false, betAmountParsed],
    enabled: Boolean(betAmountParsed > 0n && allowance >= betAmountParsed),
  });
  const { isLoading: isLoadingNo, isSuccess: isSuccessNo, write: writeNo } = useContractWrite(configNo);

  // --- Resolution Hooks ---
  const { config: configResolveYes } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'resolveMarket',
    args: [id, true],
  });
  const { isLoading: isLoadingResolveYes, isSuccess: isSuccessResolveYes, write: writeResolveYes } = useContractWrite(configResolveYes);

  const { config: configResolveNo } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'resolveMarket',
    args: [id, false],
  });
  const { isLoading: isLoadingResolveNo, isSuccess: isSuccessResolveNo, write: writeResolveNo } = useContractWrite(configResolveNo);

  // --- NFT: Read User's Winning Token Balance ---
  const yesTokenId = id * 2n; 
  const noTokenId = (id * 2n) + 1n;

  const isResolvedYes = Number(outcome) === 1;
  const isResolvedNo = Number(outcome) === 2;
  const winningTokenId = isResolvedYes ? yesTokenId : (isResolvedNo ? noTokenId : null);

  const { data: winningTokenBalance } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [userAddress, winningTokenId],
    enabled: isResolved && Boolean(userAddress) && winningTokenId !== null,
    watch: true,
  });

  // --- Read YES and NO token balances (for "Your Bet" badge) ---
  const { data: yesTokenBalance } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [userAddress, yesTokenId],
    enabled: Boolean(userAddress),
    watch: true,
  });

  const { data: noTokenBalance } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [userAddress, noTokenId],
    enabled: Boolean(userAddress),
    watch: true,
  });

  // --- "withdraw" Hook ---
  const { config: configWithdraw } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'withdraw',
    args: [id],
    enabled: winningTokenBalance > 0n,
  });
  const { isLoading: isLoadingWithdraw, isSuccess: isSuccessWithdraw, write: writeWithdraw } = useContractWrite(configWithdraw);

  // Auto-clear after successful bet - SAFE version
  useEffect(() => {
    if (isSuccessYes || isSuccessNo) {
      const timer = setTimeout(() => {
        setBetAmount('');
        setShowBetting(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSuccessYes, isSuccessNo]);

  // --- Calculate Probabilities (using pools, not weighted for now) ---
  const calculateProbabilities = () => {
    const totalPool = yesBets + noBets;

    if (totalPool === 0n) {
      return { yesProb: 0, noProb: 0 };
    }
    const yesProb = Number((yesBets * 100n) / totalPool);
    const noProb = 100 - yesProb;
    
    return { yesProb, noProb };
  };

  const { yesProb, noProb } = calculateProbabilities();
  const totalPool = formatUnits(yesBets + noBets, 6);
  const isArbitrator = userAddress && arbitrator && (userAddress.toLowerCase() === arbitrator.toLowerCase());
  const hasSufficientAllowance = allowance >= betAmountParsed;
  const showApproveButton = !hasSufficientAllowance && betAmountParsed > 0n;

  // Check if user has NFTs (has bet on this market)
  const userHasYesNFT = yesTokenBalance > 0n;
  const userHasNoNFT = noTokenBalance > 0n;
  const userHasBets = userHasYesNFT || userHasNoNFT;

  // Check if user won
  const userWon = isResolved && winningTokenBalance > 0n;

  return (
    <div className={`market-card-modern ${isResolved ? 'resolved' : ''}`}>
      {/* Market Header */}
      <div className="market-header">
        <div className="market-question">
          {question}
        </div>
        <div className="market-date">
          <span className="date-icon">📅</span>
          {date}
        </div>
      </div>

      {/* VS Section */}
      <div className="vs-section">
        {/* YES Side */}
        <div className={`outcome-side yes-side ${isResolvedYes ? 'winner' : ''}`}>
          <div className="outcome-icon">
            <div className="icon-circle yes-circle">
              {isResolvedYes ? '🏆' : '✅'}
            </div>
          </div>
          <div className="outcome-label">YES</div>
          <div className="outcome-prob">{yesProb}%</div>
          <div className="outcome-pool">{formatUnits(yesBets, 6)} USDC</div>
        </div>

        {/* Center VS */}
        <div className="vs-divider">
          <div className="vs-text">VS</div>
          <div className="vs-pool">
            <div className="pool-label">Total Pool</div>
            <div className="pool-value">{totalPool} USDC</div>
          </div>
        </div>

        {/* NO Side */}
        <div className={`outcome-side no-side ${isResolvedNo ? 'winner' : ''}`}>
          <div className="outcome-icon">
            <div className="icon-circle no-circle">
              {isResolvedNo ? '🏆' : '❌'}
            </div>
          </div>
          <div className="outcome-label">NO</div>
          <div className="outcome-prob">{noProb}%</div>
          <div className="outcome-pool">{formatUnits(noBets, 6)} USDC</div>
        </div>
      </div>

      {/* Action Section */}
      {!isResolved && (
        <div className="action-section">
          {!showBetting ? (
            <>
              <div className="betting-instructions">
                <div className="instruction-icon">💡</div>
                <div className="instruction-text">
                  <strong>How to Bet:</strong> Enter your USDC amount and approve the transaction. After approval, please wait a few moments for blockchain confirmation before the betting buttons appear. Then choose YES or NO - you'll receive NFT tokens as your bet receipt!
                </div>
              </div>
              <button 
                className="place-bet-btn" 
                onClick={() => setShowBetting(true)}
              >
                <span className="btn-icon">💰</span>
                Place Your Bet
              </button>
            </>
          ) : (
            <div className="betting-interface">
              {/* Add Step Progress Indicators */}
              <div className="betting-steps">
                <div className={`step ${!showApproveButton ? 'completed' : betAmountParsed > 0n ? 'active' : ''}`}>
                  <span className="step-number">1</span>
                  <span className="step-text">Enter Amount</span>
                </div>
                <div className={`step ${!showApproveButton ? 'completed' : isLoadingApprove ? 'active' : ''}`}>
                  <span className="step-number">2</span>
                  <span className="step-text">Approve USDC</span>
                </div>
                <div className={`step ${isLoadingYes || isLoadingNo || isSuccessYes || isSuccessNo ? 'active' : ''}`}>
                  <span className="step-number">3</span>
                  <span className="step-text">Place Bet</span>
                </div>
              </div>

              <div className="bet-input-group">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Enter amount (USDC)"
                  className="bet-input"
                />
              </div>
              
              <VotingPowerCalculator userAddress={userAddress} betAmount={betAmount} />

              {showApproveButton ? (
                <>
                  <button
                    disabled={isLoadingApprove || !writeApprove || betAmountParsed === 0n}
                    onClick={() => writeApprove?.()}
                    className="approve-btn-modern"
                  >
                    {isLoadingApprove ? (
                      <>⏳ Approving... Check your wallet</>
                    ) : betAmountParsed === 0n ? (
                      <>⚠️ Enter amount first</>
                    ) : (
                      <>✓ Approve {betAmount} USDC</>
                    )}
                  </button>
                  {isLoadingApprove && (
                    <div className="approval-loading">
                      <div className="loading-spinner-small"></div>
                      <span>Processing approval...</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="bet-buttons-modern">
                    <button 
                      disabled={!writeYes || isLoadingYes || betAmountParsed === 0n} 
                      onClick={() => writeYes?.()} 
                      className="bet-btn yes-btn"
                    >
                      {isLoadingYes ? '⏳ Betting...' : '✅ Bet YES'}
                    </button>
                    <button 
                      disabled={!writeNo || isLoadingNo || betAmountParsed === 0n} 
                      onClick={() => writeNo?.()} 
                      className="bet-btn no-btn"
                    >
                      {isLoadingNo ? '⏳ Betting...' : '❌ Bet NO'}
                    </button>
                  </div>
                  
                  {/* ----- THIS BLOCK WAS CHANGED ----- */}
                  <div className="betting-hint success-hint">
                    ✓ Approval successful. Place your bet.
                  </div>

                </>
              )}
              
              {/* Show success message with reset button */}
              {(isSuccessYes || isSuccessNo) && (
                <div className="bet-success-box">
                  <div className="success-text">
                    ✅ Bet placed successfully! NFT minted 🎫
                  </div>
                  <button 
                    className="reset-bet-btn"
                    onClick={resetBettingForm}
                  >
                    Place Another Bet
                  </button>
                </div>
              )}
              
              <button 
                className="cancel-bet-btn" 
                onClick={resetBettingForm}
                disabled={isLoadingApprove || isLoadingYes || isLoadingNo}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin Controls */}
      {!isResolved && isArbitrator && (
        <div className="admin-section">
          <div className="admin-badge">⚙️ Arbitrator Controls</div>
          <div className="admin-buttons">
            <button 
              disabled={isLoadingResolveYes} 
              onClick={() => writeResolveYes?.()} 
              className="resolve-btn yes-resolve"
            >
              {isLoadingResolveYes ? '⏳ Resolving...' : '✅ Resolve YES'}
            </button>
            <button 
              disabled={isLoadingResolveNo} 
              onClick={() => writeResolveNo?.()} 
              className="resolve-btn no-resolve"
            >
              {isLoadingResolveNo ? '⏳ Resolving...' : '❌ Resolve NO'}
            </button>
          </div>
        </div>
      )}

      {/* Winner Section - NFT REDEMPTION */}
      {isResolved && userWon && (
        <div className="winner-section">
          
          <div className="winner-badge">🎉 You Won {formatUnits(winningTokenBalance || 0n, 6)} USDC!</div>
          
          <button 
            disabled={isLoadingWithdraw || !writeWithdraw} 
            onClick={() => writeWithdraw?.()} 
            className="withdraw-btn"
          >
            {isLoadingWithdraw ? '⏳ Redeeming...' : '💰 Redeem NFTs for Winnings'}
          </button>
        </div>
      )}

      {/* Show User's NFT Holdings - CLEARER DESIGN */}
      {!isResolved && userHasBets && (
        <div className="nft-holdings-display">
          <div className="nft-holdings-title">
            <span className="nft-title-icon">🎫</span>
            <span>Your NFT Position</span>
          </div>
          <div className="nft-holdings-cards">
            {userHasYesNFT && (
              <div className="nft-position-card yes-position">
                <div className="nft-position-icon">✅</div>
                <div className="nft-position-amount">{formatUnits(yesTokenBalance, 6)} USDC</div>
                <div className="nft-position-label">NFT for YES</div>
              </div>
            )}
            {userHasNoNFT && (
              <div className="nft-position-card no-position">
                <div className="nft-position-icon">❌</div>
                <div className="nft-position-amount">{formatUnits(noTokenBalance, 6)} USDC</div>
                <div className="nft-position-label">NFT for NO</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Messages */}
      {isSuccessApprove && <div className="toast-success">✓ Approval successful!</div>}
      {isSuccessYes && <div className="toast-success">✓ Bet placed! NFT minted 🎫</div>}
      {isSuccessNo && <div className="toast-success">✓ Bet placed! NFT minted 🎫</div>}
      {isSuccessResolveYes && <div className="toast-success">✓ Market resolved to YES!</div>}
      {isSuccessResolveNo && <div className="toast-success">✓ Market resolved to NO!</div>}
      {isSuccessWithdraw && <div className="toast-success">✓ NFTs redeemed! Winnings claimed!</div>}
    </div>
  );
}

export default MarketCard;