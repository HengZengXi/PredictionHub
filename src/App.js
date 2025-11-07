import './App.css';
import MarketCard from './components/MarketCard';
import CreateMarket from './components/CreateMarket';
import ReputationDisplay from './components/ReputationDisplay';
import ReputationLeaderboard from './components/ReputationLeaderboard';
import HowReputationWorks from './components/HowReputationWorks';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useContractRead, useContractReads } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { contractAddress, contractABI } from './constants';
import { useState } from 'react';

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  // Pagination state
  const [openMarketsPage, setOpenMarketsPage] = useState(1);
  const [closedMarketsPage, setClosedMarketsPage] = useState(1);
  const MARKETS_PER_PAGE = 6;

  // ----- UPDATED: JavaScript Scroll Function -----
  const scrollToSection = (event, sectionId) => {
    // Prevent the default "jump" behavior of the href
    event.preventDefault(); 

    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate offset for sticky 70px navbar
      const yOffset = -70; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Smoothly scroll to that position
      window.scrollTo({top: y, behavior: 'smooth'});
      
      // Also update the URL hash without trapping the scroll
      window.history.pushState(null, null, `#${sectionId}`);
    }
  };

  const { data: marketCountData } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getMarketCount',
    watch: true,
  });

  const marketCount = marketCountData ? Number(marketCountData) : 0;

  // Read markets directly + separate weighted calls
  const marketReads = [];
  for (let i = 0; i < marketCount; i++) {
    marketReads.push({
      address: contractAddress,
      abi: contractABI,
      functionName: 'markets',
      args: [i],
    });
    marketReads.push({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getTotalWeightedYes',
      args: [i],
    });
    marketReads.push({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getTotalWeightedNo',
      args: [i],
    });
  }

  const { data: marketBatchData, isLoading } = useContractReads({
    contracts: marketReads,
    watch: true,
    cacheTime: 5_000,
    staleTime: 2_000,
  });

  const processedMarkets = [];
  if (marketBatchData) {
    for (let i = 0; i < marketCount * 3; i += 3) {
      const marketDataResult = marketBatchData[i]?.result;
      const weightedYesResult = marketBatchData[i + 1]?.result;
      const weightedNoResult = marketBatchData[i + 2]?.result;

      if (marketDataResult) {
        processedMarkets.push({
          id: marketDataResult[0],
          question: marketDataResult[1],
          arbitrator: marketDataResult[2],
          date: new Date(Number(marketDataResult[3]) * 1000).toLocaleDateString(),
          outcome: marketDataResult[4],      // NEW: index 4
          yesPool: marketDataResult[5],      // NEW: yesPool at index 5
          noPool: marketDataResult[6],       // NEW: noPool at index 6
          isResolved: marketDataResult[7],   // NEW: isResolved at index 7
          weightedYes: typeof weightedYesResult === 'bigint' ? weightedYesResult : 0n,
          weightedNo: typeof weightedNoResult === 'bigint' ? weightedNoResult : 0n,
        });
      }
    }
  }

  // Filter by isResolved instead of outcome
  const openMarkets = processedMarkets.filter(m => !m.isResolved);
  const closedMarkets = processedMarkets.filter(m => m.isResolved);

  // Pagination logic
  const paginateMarkets = (markets, page) => {
    const startIndex = (page - 1) * MARKETS_PER_PAGE;
    const endIndex = startIndex + MARKETS_PER_PAGE;
    return markets.slice(startIndex, endIndex);
  };

  const getTotalPages = (markets) => Math.ceil(markets.length / MARKETS_PER_PAGE);

  // Wallet button with reputation badge
  const renderWalletButton = () => {
    if (isConnected) {
      return (
        <div className="wallet-connected">
          <div className="wallet-address">
            <span className="wallet-icon">🔗</span>
            <span className="address-text">
              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
            </span>
          </div>
          <ReputationDisplay userAddress={address} compact={true} />
          <button className="disconnect-btn" onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      );
    } else {
      return (
        <button className="connect-wallet-btn" onClick={() => connect()}>
          <span className="wallet-icon">🦊</span>
          Connect Wallet
        </button>
      );
    }
  };

  // Market list renderer with pagination
  const renderMarketList = (markets, currentPage, setPage) => {
    const totalPages = getTotalPages(markets);
    const paginatedMarkets = paginateMarkets(markets, currentPage);

    if (!markets || markets.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No markets in this category.</p>
        </div>
      );
    }

    return (
      <>
        <div className="markets-grid">
          {paginatedMarkets.map((market) => (
            <MarketCard
              key={market.id}
              id={market.id}
              question={market.question}
              arbitrator={market.arbitrator}
              date={market.date}
              yesBets={market.yesPool}
              noBets={market.noPool}
              outcome={market.outcome}
              userAddress={address}
              weightedYes={market.weightedYes}
              weightedNo={market.weightedNo}
              isResolved={market.isResolved}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ← Previous
            </button>
            
            <div className="pagination-info">
              <span className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </span>
              <span className="page-text">
                Page {currentPage} of {totalPages} ({markets.length} total)
              </span>
            </div>

            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="app-container">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <nav className="navbar">
        <div className="navbar-content">
          
          {/* ----- UPDATED LINKS ----- */}
          <a onClick={(e) => scrollToSection(e, 'home')} className="logo" href="#home">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">PredictHub</span>
          </a>

          <div className="nav-menu">
            {/* ----- UPDATED LINKS ----- */}
            <a onClick={(e) => scrollToSection(e, 'home')} className="nav-link" href="#home">
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </a>
            <a onClick={(e) => scrollToSection(e, 'create')} className="nav-link" href="#create">
              <span className="nav-icon">✨</span>
              <span>Create</span>
            </a>
            <a onClick={(e) => scrollToSection(e, 'active')} className="nav-link" href="#active">
              <span className="nav-icon">🔥</span>
              <span>Active</span>
            </a>
            <a onClick={(e) => scrollToSection(e, 'resolved')} className="nav-link" href="#resolved">
              <span className="nav-icon">✅</span>
              <span>Resolved</span>
            </a>
            <a onClick={(e) => scrollToSection(e, 'leaderboard')} className="nav-link" href="#leaderboard">
              <span className="nav-icon">🏆</span>
              <span>Leaderboard</span>
            </a>
          </div>

          {renderWalletButton()}
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Predict the Future.</span>
            <br />
            <span className="gradient-text-alt">Win Big.</span>
          </h1>
          <p className="hero-subtitle">
            The most advanced decentralized prediction market on the blockchain.
            Create markets, place bets, and earn rewards with NFT bet receipts!
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{marketCount}</div>
              <div className="stat-label">Total Markets</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{openMarkets.length}</div>
              <div className="stat-label">Active Markets</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{closedMarkets.length}</div>
              <div className="stat-label">Resolved</div>
            </div>
          </div>
        </div>
      </section>

      <section id="create" className="create-market-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">✨</span>
            Create New Market
          </h2>
          <p className="section-subtitle">
            Launch your own prediction market and let the crowd decide
          </p>
        </div>
        <CreateMarket />
      </section>

      <section id="active" className="markets-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">🔥</span>
            Active Markets
          </h2>
          <p className="section-subtitle">
            {openMarkets.length} markets open for betting
          </p>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading markets from blockchain...</p>
          </div>
        ) : (
          renderMarketList(openMarkets, openMarketsPage, setOpenMarketsPage)
        )}
      </section>

      <section id="resolved" className="markets-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">✅</span>
            Resolved Markets
          </h2>
          <p className="section-subtitle">
            {closedMarkets.length} markets have been resolved
          </p>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading markets from blockchain...</p>
          </div>
        ) : (
          renderMarketList(closedMarkets, closedMarketsPage, setClosedMarketsPage)
        )}
      </section>

      <section id="leaderboard" className="reputation-section">
        <ReputationLeaderboard 
          markets={processedMarkets} 
          currentUserAddress={address} 
        />
      </section>

      <section id="how-it-works" className="reputation-tutorial-section">
        <HowReputationWorks />
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">PredictHub</span>
          </div>
          <p className="footer-text">
            Decentralized prediction markets powered by blockchain technology with NFT bet receipts
          </p>
          <div className="footer-links">
            <a onClick={(e) => scrollToSection(e, 'home')} href="#home" className="footer-link">Home</a>
            <a onClick={(e) => scrollToSection(e, 'how-it-works')} href="#how-it-works" className="footer-link">How It Works</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;