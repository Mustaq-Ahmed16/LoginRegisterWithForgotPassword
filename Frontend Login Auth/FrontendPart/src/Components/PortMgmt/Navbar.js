import React from 'react';
import './Navbar.css';  // Add your custom styles here

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
        <span>👤 v.selvap Viswanath</span>
        <br />
        <a href="/profile">View Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
