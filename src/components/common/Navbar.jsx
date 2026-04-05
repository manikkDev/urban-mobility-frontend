import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' ? 'active' : '';
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  const handleLogout = async () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="2.5"/>
                <path d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="24" cy="16" r="2.5" fill="currentColor"/>
                <path d="M24 20v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 28h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M16 24h4M28 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="50%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-text">Urban<span className="brand-highlight">Mobility</span></span>
          </Link>

          <button
            className={`menu-toggle ${menuOpen ? 'menu-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {isAuthenticated ? (
              <>
                {userProfile?.role === 'citizen' && (
                  <>
                    <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`}>
                      <span className="nav-icon">📋</span> Schemes
                    </Link>
                    <Link to="/issues" className={`nav-link ${isActive('/issues')}`}>
                      <span className="nav-icon">🔴</span> Live Issues
                    </Link>
                    <Link to="/report" className={`nav-link ${isActive('/report')}`}>
                      <span className="nav-icon">📝</span> Report
                    </Link>
                    <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                      <span className="nav-icon">👤</span> Profile
                    </Link>
                  </>
                )}
                {userProfile?.role === 'admin' && (
                  <>
                    <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
                      <span className="nav-icon">📊</span> Dashboard
                    </Link>
                    <Link to="/admin/reports" className={`nav-link ${isActive('/admin/reports')}`}>
                      <span className="nav-icon">📋</span> All Reports
                    </Link>
                    <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`}>
                      <span className="nav-icon">🏗️</span> Schemes
                    </Link>
                  </>
                )}

                <div className="nav-divider"></div>

                <div className="nav-user-section">
                  <div className="nav-user-badge">
                    <span className="user-avatar">
                      {userProfile?.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                    <span className="user-role-tag">{userProfile?.role}</span>
                  </div>
                  <button onClick={handleLogout} className="nav-logout-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>
                  How It Works
                </Link>
                <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                  Sign In
                </Link>
                <Link to="/signup" className="nav-cta-btn">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal animate-scale" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3>Sign Out?</h3>
            <p>Are you sure you want to log out of your account?</p>
            <div className="logout-modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmLogout}>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
