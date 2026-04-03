import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">Railway Disability Scheme Tracking & Accessibility Platform</h1>
          <p className="hero-subtitle">
            Track railway disability schemes. Report live station issues. Hold railway authorities accountable.
          </p>
          <div className="hero-actions">
            <Link to="/schemes" className="btn btn-primary btn-large">
              Browse Railway Schemes
            </Link>
            <Link to="/report" className="btn btn-secondary btn-large">
              Report Railway Issue
            </Link>
          </div>
        </div>

        <div className="info-section">
          <h2>What This Platform Does</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">&#128646;</div>
              <h3>Track Railway Schemes</h3>
              <p>
                Browse railway disability accessibility schemes — lifts, escalators, ramps, platforms, FOBs, tactile paths, and assistance facilities. See official status vs. ground reality.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">&#128308;</div>
              <h3>Live Status Tracking</h3>
              <p>
                Real-time color status: <strong style={{color:'#16a34a'}}>Green</strong> = working, <strong style={{color:'#ca8a04'}}>Yellow</strong> = partially working, <strong style={{color:'#dc2626'}}>Red</strong> = broken/ignored, <strong style={{color:'#6b7280'}}>Gray</strong> = unverified.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">&#128227;</div>
              <h3>Report Railway Issues</h3>
              <p>
                Broken lift at station? Non-working escalator? Inaccessible platform? Report railway accessibility issues as they happen and create public accountability.
              </p>
            </div>
          </div>
        </div>

        <div className="score-info-section">
          <h2>Understanding Railway Scheme Status Colors</h2>
          <div className="score-legend">
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#16a34a' }}>Working</span>
              <p>Railway scheme is functional and verified by passengers</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#ca8a04' }}>Partially Working</span>
              <p>Railway scheme has issues or is only partially implemented</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#dc2626' }}>Not Working / Ignored</span>
              <p>Railway scheme is broken, non-functional, or ignored by railway officials</p>
            </div>
            <div className="legend-item">
              <span className="legend-badge" style={{ backgroundColor: '#6b7280' }}>Unverified</span>
              <p>No passenger reports yet — status unknown</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Help Make Railway Stations Accessible</h2>
          <p>Browse railway schemes, see ground reality, and report what needs fixing at stations</p>
          <div className="hero-actions">
            <Link to="/schemes" className="btn btn-primary btn-large">
              View All Railway Schemes
            </Link>
            <Link to="/issues" className="btn btn-secondary btn-large">
              View Live Issue Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
