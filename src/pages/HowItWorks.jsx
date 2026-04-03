import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <div className="container">
        <h1>How This Platform Works</h1>
        <p className="page-subtitle">
          A simple guide to understanding how we track accessibility schemes and citizen reports.
        </p>

        <div className="steps-section">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Browse Accessibility Schemes</h3>
              <p>
                The platform lists government accessibility schemes — escalator upgrades, ramp installations,
                footpath improvements, lift installations, pedestrian crossings, and more. Each scheme shows
                its official status (announced, sanctioned, in progress, completed) alongside what citizens
                report on the ground.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Check the Color-Coded Status</h3>
              <p>
                Every scheme has a clear, color-coded public status based on real citizen reports:
              </p>
              <div className="color-legend">
                <div className="color-item">
                  <span className="color-dot" style={{ backgroundColor: '#16a34a' }}></span>
                  <div>
                    <strong>Green — Working</strong>
                    <p>The scheme is functional and verified by citizens.</p>
                  </div>
                </div>
                <div className="color-item">
                  <span className="color-dot" style={{ backgroundColor: '#ca8a04' }}></span>
                  <div>
                    <strong>Yellow — Partially Working</strong>
                    <p>The scheme has issues or is only partially implemented.</p>
                  </div>
                </div>
                <div className="color-item">
                  <span className="color-dot" style={{ backgroundColor: '#dc2626' }}></span>
                  <div>
                    <strong>Red — Not Working / Ignored</strong>
                    <p>The scheme is broken, non-functional, or completely ignored by officials.</p>
                  </div>
                </div>
                <div className="color-item">
                  <span className="color-dot" style={{ backgroundColor: '#6b7280' }}></span>
                  <div>
                    <strong>Gray — Unverified</strong>
                    <p>No citizen reports yet. The real status is unknown.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Compare Official vs Public Reality</h3>
              <p>
                On each scheme detail page, you can see the official government claim next to the
                citizen-reported public status. When officials say a scheme is "completed" but citizens
                report it as "not working" or "ignored," the platform flags this mismatch clearly.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Report Issues You See</h3>
              <p>
                If you encounter a broken escalator, blocked footpath, damaged ramp, unsafe crossing,
                or any accessibility problem — report it. Your report helps:
              </p>
              <ul className="benefit-list">
                <li>Update the public status of the scheme</li>
                <li>Alert other citizens about the real situation</li>
                <li>Surface official neglect and mismatches</li>
                <li>Build evidence for accountability</li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>View the Public Issue Feed</h3>
              <p>
                The issue feed shows all citizen-reported problems across all schemes in one place.
                Filter by category, severity, or area to see what needs attention. This is the
                public record of accessibility gaps in your city.
              </p>
            </div>
          </div>
        </div>

        <div className="categories-section card">
          <h2>Types of Schemes We Track</h2>
          <div className="categories-grid">
            <div className="cat-item"><strong>Escalator Access</strong> — Public escalator installations and maintenance</div>
            <div className="cat-item"><strong>Lift Access</strong> — Elevator installations at public buildings</div>
            <div className="cat-item"><strong>Ramp Access</strong> — Wheelchair ramp installations</div>
            <div className="cat-item"><strong>Accessible Roads</strong> — Road improvements for wheelchair and elderly access</div>
            <div className="cat-item"><strong>Footpath Access</strong> — Footpath clearing and upgrades</div>
            <div className="cat-item"><strong>Tactile Navigation</strong> — Tactile paths for visually impaired</div>
            <div className="cat-item"><strong>Pedestrian Crossings</strong> — Safe crossing upgrades with signals</div>
            <div className="cat-item"><strong>Public Toilets</strong> — Accessible toilet renovations</div>
            <div className="cat-item"><strong>Public Entry Access</strong> — Accessible building entrances</div>
            <div className="cat-item"><strong>Mixed Accessibility</strong> — Comprehensive multi-facility upgrades</div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Help?</h2>
          <p>Every report you submit helps build a more accurate picture of accessibility in your city.</p>
          <div className="cta-buttons">
            <Link to="/schemes" className="btn btn-primary btn-large">Browse Schemes</Link>
            <Link to="/report" className="btn btn-secondary btn-large">Report an Issue</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
