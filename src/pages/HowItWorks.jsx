import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <div className="container">
        <h1>How This Platform Works</h1>
        <p className="page-subtitle">
          A simple guide to understanding how we track railway disability schemes and passenger reports.
        </p>

        <div className="steps-section">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Browse Railway Disability Schemes</h3>
              <p>
                The platform lists railway accessibility schemes — railway lift installations, escalator upgrades, ramp installations,
                platform accessibility, foot over bridge improvements, tactile navigation, disability assistance facilities, and more. Each scheme shows
                its official status (announced, sanctioned, in progress, completed) alongside what railway passengers
                report on the ground at stations.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Check the Color-Coded Status</h3>
              <p>
                Every railway scheme has a clear, color-coded public status based on real passenger reports:
              </p>
              <div className="color-legend">
                <div className="color-item">
                  <span className="color-dot" style={{ backgroundColor: '#16a34a' }}></span>
                  <div>
                    <strong>Green — Working</strong>
                    <p>The railway scheme is functional and verified by passengers.</p>
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
                On each scheme detail page, you can see the official railway authority claim next to the
                passenger-reported public status. When railway officials say a scheme is "completed" but passengers
                report it as "not working" or "ignored," the platform flags this mismatch clearly.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Report Railway Issues You See</h3>
              <p>
                If you encounter a broken railway lift, non-working escalator, damaged ramp at station, inaccessible platform,
                blocked wheelchair access, or any railway accessibility problem — report it. Your report helps:
              </p>
              <ul className="benefit-list">
                <li>Update the public status of the railway scheme</li>
                <li>Alert other passengers about the real situation at stations</li>
                <li>Surface railway official neglect and mismatches</li>
                <li>Build evidence for railway accessibility accountability</li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>View the Public Issue Feed</h3>
              <p>
                The issue feed shows all passenger-reported railway accessibility problems across all schemes in one place.
                Filter by category, severity, or station to see what needs attention. This is the
                public record of railway accessibility gaps across stations and divisions.
              </p>
            </div>
          </div>
        </div>

        <div className="categories-section card">
          <h2>Types of Railway Schemes We Track</h2>
          <div className="categories-grid">
            <div className="cat-item"><strong>Railway Lift Access</strong> — Lift installations at railway stations for platform access</div>
            <div className="cat-item"><strong>Railway Escalator Access</strong> — Escalator installations and maintenance at railway FOBs</div>
            <div className="cat-item"><strong>Railway Ramp Access</strong> — Wheelchair ramp installations at station entries and platforms</div>
            <div className="cat-item"><strong>Platform Access</strong> — Platform height adjustment and gap reduction for wheelchair boarding</div>
            <div className="cat-item"><strong>Foot Over Bridge Access</strong> — FOB widening, lift installation, and wheelchair accessibility</div>
            <div className="cat-item"><strong>Tactile Navigation</strong> — Tactile paths for visually impaired passengers at stations</div>
            <div className="cat-item"><strong>Wheelchair Support</strong> — Wheelchair availability and support services at stations</div>
            <div className="cat-item"><strong>Disability Assistance</strong> — Dedicated assistance counters and trained staff for disabled passengers</div>
            <div className="cat-item"><strong>Accessible Toilet Access</strong> — Accessible toilet renovations at railway stations</div>
            <div className="cat-item"><strong>Station Entry Access</strong> — Accessible station entrance improvements with ramps and automatic doors</div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Help?</h2>
          <p>Every report you submit helps build a more accurate picture of railway accessibility across stations.</p>
          <div className="cta-buttons">
            <Link to="/schemes" className="btn btn-primary btn-large">Browse Railway Schemes</Link>
            <Link to="/report" className="btn btn-secondary btn-large">Report Railway Issue</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
