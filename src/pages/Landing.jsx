import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">Inclusive Urban Mobility Intelligence Platform</h1>
          <p className="hero-subtitle">
            Track accessibility schemes. Report real issues. Hold officials accountable.
          </p>
          <div className="hero-actions">
            <Link to="/schemes" className="btn btn-primary btn-large">
              Browse Schemes
            </Link>
            <Link to="/report" className="btn btn-secondary btn-large">
              Report an Issue
            </Link>
          </div>
        </div>

        <div className="info-section">
          <h2>What This Platform Does</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">&#9855;</div>
              <h3>Track Schemes</h3>
              <p>
                Browse government accessibility schemes — escalators, ramps, lifts, footpaths, crossings, and more. See their official status and public reality side by side.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">&#128308;</div>
              <h3>Color-Coded Status</h3>
              <p>
                Every scheme gets a clear color: <strong style={{color:'#16a34a'}}>Green</strong> = working, <strong style={{color:'#ca8a04'}}>Yellow</strong> = partially working, <strong style={{color:'#dc2626'}}>Red</strong> = not working or ignored, <strong style={{color:'#6b7280'}}>Gray</strong> = unverified.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">&#128227;</div>
              <h3>Report Issues</h3>
              <p>
                Broken escalator? Blocked footpath? Ramp unusable? Report the issue and help surface the real accessibility picture on the ground.
              </p>
            </div>
          </div>
        </div>

        <div className="score-info-section">
          <h2>Understanding Scheme Status Colors</h2>
          <div className="score-legend">
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#16a34a' }}>Working</span>
              <p>Scheme is functional and verified by citizens</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#ca8a04' }}>Partially Working</span>
              <p>Scheme has issues or is only partially implemented</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#dc2626' }}>Not Working / Ignored</span>
              <p>Scheme is broken, non-functional, or ignored by officials</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#6b7280' }}>Unverified</span>
              <p>No citizen reports yet — status unknown</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Help Make Your City Accessible</h2>
          <p>Browse schemes, see what is really happening, and report what needs fixing</p>
          <div className="hero-actions">
            <Link to="/schemes" className="btn btn-primary btn-large">
              View All Schemes
            </Link>
            <Link to="/issues" className="btn btn-secondary btn-large">
              View Issue Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
