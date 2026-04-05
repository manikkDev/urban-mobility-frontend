import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuth();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' ? 'active' : '';
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;
    
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
            {isAuthenticated ? (
              <>
                {/* Show navigation based on role */}
                {userProfile?.role === 'citizen' && (
                  <>
                    <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`} onClick={() => setMenuOpen(false)}>
                      Railway Schemes
                    </Link>
                    <Link to="/issues" className={`nav-link ${isActive('/issues')}`} onClick={() => setMenuOpen(false)}>
                      Live Issues
                    </Link>
                    <Link to="/report" className={`nav-link ${isActive('/report')}`} onClick={() => setMenuOpen(false)}>
                      Report Issue
                    </Link>
                    <Link to="/profile" className={`nav-link ${isActive('/profile')}`} onClick={() => setMenuOpen(false)}>
                      My Profile
                    </Link>
                  </>
                )}
                {userProfile?.role === 'admin' && (
                  <>
                    <Link to="/admin" className={`nav-link ${isActive('/admin')}`} onClick={() => setMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/reports" className={`nav-link ${isActive('/admin/reports')}`} onClick={() => setMenuOpen(false)}>
                      All Reports
                    </Link>
                    <Link to="/admin/schemes" className={`nav-link ${isActive('/admin/schemes')}`} onClick={() => setMenuOpen(false)}>
                      Manage Schemes
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="nav-link nav-link-button">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-link ${isActive('/login')}`} onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className={`nav-link nav-link-signup ${isActive('/signup')}`} onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
