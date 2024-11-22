// PortfolioPage.jsx
// PortfolioPage.jsx
import React, { useState } from 'react';
import './Portfolio.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-chart-line"></i> SafeCryptoStocks
      </div>
      <ul className="navbar-links">
        <li><a href="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
        <li><a href="/market"><i className="fas fa-chart-area"></i> Market</a></li>
        <li><a href="/portfolio"><i className="fas fa-briefcase"></i> Portfolio</a></li>
        <li><a href="/budget"><i className="fas fa-wallet"></i> Budget</a></li>
        <li><a href="/learn"><i className="fas fa-book"></i> Learn</a></li>
      </ul>
      <div className="navbar-profile">
        <i className="fas fa-user-circle"></i>

        <span>👤v.selvap Viswanath</span>
        <br></br>

        <a href="/profile" >View Profile</a>
      </div>
    </nav>
  );
};

const Sidebar = ({ portfolios }) => {
  return (
    <div className="sidebar">
      <h3>My Portfolios</h3>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id} className="portfolio-item">
            <i className="fas fa-folder"></i>
            <h4>{portfolio.name}</h4>
            <p>{portfolio.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Portfolio = () => {
  const [balance, setBalance] = useState(872043.00);
  const [profitLoss, setProfitLoss] = useState(52384.00);
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: "demo", tags: ["Socially-Responsible", "Investing"] }
  ]);
  const [assets, setAssets] = useState([
    { id: 1, name: "BNB", symbol: "BNB", price: 45897.00, change24h: -1.34, holdings: 872043.00, avgBuyPrice: 42709.00, profitLoss: 52384.00 }
  ]);

  return (
    <div className="portfolio-page">
      {/* Navbar */}
      <Navbar />

      <div className="portfolio-content">
        {/* Sidebar */}
        <Sidebar portfolios={portfolios} />

        {/* Main Content */}
        <div className="main-content">
          {/* Current Balance Section */}
          <div className="balance-section">
            <h2>Current Balance</h2>
            <h1>${balance.toLocaleString()}</h1>
            <p className={`profit-loss ${profitLoss >= 0 ? 'positive' : 'negative'}`}>
              ${profitLoss.toLocaleString()}
            </p>
            <button className="buy-stocks-btn"><i className="fas fa-shopping-cart"></i> BUY STOCKS</button>
          </div>

          {/* Assets Table */}
          <div className="assets-section">
            <h3>Your Assets</h3>
            <table className="assets-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>24h</th>
                  <th>Holdings</th>
                  <th>Avg. Buy Price</th>
                  <th>Profit/Loss</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td>
                      <div className="asset-name">
                        <img src={`https://cryptoicons.org/api/icon/${asset.symbol.toLowerCase()}/32`} alt={asset.name} />
                        <span>{asset.name}</span>
                        <span className="asset-symbol">{asset.symbol}</span>
                      </div>
                    </td>
                    <td>${asset.price.toLocaleString()}</td>
                    <td className={asset.change24h < 0 ? 'negative' : 'positive'}>
                      {asset.change24h}%
                    </td>
                    <td>${asset.holdings.toLocaleString()}</td>
                    <td>${asset.avgBuyPrice.toLocaleString()}</td>
                    <td className={asset.profitLoss >= 0 ? 'positive' : 'negative'}>
                      ${asset.profitLoss.toLocaleString()}
                    </td>
                    <td>
                      <button className="action-btn"><i className="fas fa-ellipsis-h"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;





// import React, { useState, useEffect } from 'react';
// import './Portfolio.css';
// import Navbar from './Navbar';  // Import the Navbar component
// import Sidebar from './Sidebar';  // Import the Sidebar component
// //import axiosIns from '../../api/axiosIns';

// const Portfolio = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('authToken'));  // Assuming token is stored in localStorage

//   useEffect(() => {
//     if (token) {
//       // Fetch data from the backend
//       axiosIns.post('/auth/portfolio', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//         .then(response => {
//           setDashboardData(response.data);  // Store the data in state
//         })
//         .catch(error => {
//           console.error("Error fetching dashboard data", error);
//           alert("Failed to fetch data, please check your token or login again.");
//         });
//     }
//   }, [token]);  // Run this effect when the token changes

//   if (!dashboardData) {
//     return <div>Loading...</div>;  // Show loading while data is being fetched
//   }

//   // Destructure the dashboard data (Assuming your backend returns this structure)
//   const { welcomeMessage, portfolioValue, recentInvestments, portfolios, assets } = dashboardData;

//   return (
//     <div className="portfolio-page">
//       {/* Navbar */}
//       <Navbar />
//       <div className="portfolio-content">
//         {/* Sidebar */}
//         <Sidebar portfolios={portfolios} />

//         {/* Main Content */}
//         <div className="main-content">
//           {/* Current Balance Section */}
//           <div className="balance-section">
//             <h2>{welcomeMessage}</h2>
//             <h1>${portfolioValue.toLocaleString()}</h1>
//             <p>Your recent investments: {recentInvestments.join(', ')}</p>
//             <button className="buy-stocks-btn"><i className="fas fa-shopping-cart"></i> BUY STOCKS</button>
//           </div>

//           {/* Assets Table */}
//           <div className="assets-section">
//             <h3>Your Assets</h3>
//             <table className="assets-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>24h</th>
//                   <th>Holdings</th>
//                   <th>Avg. Buy Price</th>
//                   <th>Profit/Loss</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assets.map((asset) => (
//                   <tr key={asset.id}>
//                     <td>
//                       <div className="asset-name">
//                         <img src={`https://cryptoicons.org/api/icon/${asset.symbol.toLowerCase()}/32`} alt={asset.name} />
//                         <span>{asset.name}</span>
//                         <span className="asset-symbol">{asset.symbol}</span>
//                       </div>
//                     </td>
//                     <td>${asset.price.toLocaleString()}</td>
//                     <td className={asset.change24h < 0 ? 'negative' : 'positive'}>
//                       {asset.change24h}%
//                     </td>
//                     <td>${asset.holdings.toLocaleString()}</td>
//                     <td>${asset.avgBuyPrice.toLocaleString()}</td>
//                     <td className={asset.profitLoss >= 0 ? 'positive' : 'negative'}>
//                       ${asset.profitLoss.toLocaleString()}
//                     </td>
//                     <td>
//                       <button className="action-btn"><i className="fas fa-ellipsis-h"></i></button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;
