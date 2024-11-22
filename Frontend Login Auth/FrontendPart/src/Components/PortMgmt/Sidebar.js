import React from 'react';
import './Sidebar.css';  // Add your custom styles here

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

export default Sidebar;
