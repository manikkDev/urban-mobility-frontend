import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' ? 'active' : '';
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-icon">&#9855;</span>
            <span className="brand-text">Urban Mobility</span>
          </Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            &#9776;
          </button>
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`} onClick={() => setMenuOpen(false)}>
              Railway Schemes
            </Link>
            <Link to="/issues" className={`nav-link ${isActive('/issues')}`} onClick={() => setMenuOpen(false)}>
              Live Issues
            </Link>
            <Link to="/report" className={`nav-link ${isActive('/report')}`} onClick={() => setMenuOpen(false)}>
              Report Issue
            </Link>
            <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`} onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
