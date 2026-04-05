import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRailwayIssues } from '../api/railwayReportApi';
import './Landing.css';

const Landing = () => {
  const [latestIssues, setLatestIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  useEffect(() => {
    fetchLatestIssues();
  }, []);

  const fetchLatestIssues = async () => {
    try {
      setLoadingIssues(true);
      const data = await getRailwayIssues();
      setLatestIssues(data.slice(0, 3));
    } catch (err) {
      console.error('Failed to load latest issues:', err);
    } finally {
      setLoadingIssues(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const stats = [
    { label: 'Schemes Tracked', value: '150+', icon: '📋' },
    { label: 'Issues Reported', value: '500+', icon: '🔴' },
    { label: 'Stations Covered', value: '80+', icon: '🚉' },
    { label: 'Active Citizens', value: '1K+', icon: '👥' },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <span className="badge-dot"></span>
            Empowering Disabled People Through Railway Accessibility
          </div>

          <h1 className="hero-title animate-fade-up delay-100">
            Railway Accessibility
            <span className="hero-title-gradient"> for Disabled People</span>
          </h1>

          <p className="hero-subtitle animate-fade-up delay-200">
            Track accessibility schemes for disabled people, report barriers at railway stations, and ensure authorities deliver on their commitments. Your voice matters.
          </p>

          <div className="hero-actions animate-fade-up delay-300">
            <Link to="/signup" className="btn btn-primary btn-large hero-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Get Started Free
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary btn-large hero-btn">
              Learn How It Works
            </Link>
          </div>

          <div className="hero-stats animate-fade-up delay-400">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-icon">{stat.icon}</span>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-label animate-fade-up">Features</div>
          <h2 className="section-title animate-fade-up delay-100">
            Everything you need to drive <span className="text-gradient">accessibility change</span>
          </h2>
          <p className="section-desc animate-fade-up delay-200">
            Our platform connects disabled people, authorities, and data to ensure railway stations deliver on accessibility commitments.
          </p>

          <div className="features-grid">
            <div className="feature-card feature-card-large animate-fade-up delay-200">
              <div className="feature-icon-wrap feature-icon-purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3>Track Accessibility Schemes</h3>
              <p>Browse railway disability accessibility schemes — lifts, escalators, ramps, tactile paths, and more. See official status vs. ground reality at every station.</p>
              <div className="feature-tag">Comprehensive Database</div>
            </div>

            <div className="feature-card animate-fade-up delay-300">
              <div className="feature-icon-wrap feature-icon-cyan">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3>Live Status Tracking</h3>
              <p>Real-time color-coded status showing what's working, broken, or being ignored by authorities.</p>
            </div>

            <div className="feature-card animate-fade-up delay-400">
              <div className="feature-icon-wrap feature-icon-orange">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              </div>
              <h3>Report Issues Instantly</h3>
              <p>Broken lift? Inaccessible platform? Report issues as they happen and build public accountability.</p>
            </div>

            <div className="feature-card animate-fade-up delay-300">
              <div className="feature-icon-wrap feature-icon-green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Citizen-Powered Data</h3>
              <p>Every report strengthens the data. See aggregated insights and demand accountability from railway officials.</p>
            </div>

            <div className="feature-card animate-fade-up delay-400">
              <div className="feature-icon-wrap feature-icon-red">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3>Escalation & Mediation</h3>
              <p>Issues aren't just reported — they're escalated. Track mediation progress and resolution status.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Legend */}
      <section className="status-section">
        <div className="container">
          <div className="status-card">
            <div className="status-card-left">
              <div className="section-label">Status System</div>
              <h2>Understanding Scheme Status</h2>
              <p>Every scheme is color-coded based on real citizen reports. See the ground truth at a glance.</p>
            </div>
            <div className="status-card-right">
              <div className="status-item">
                <div className="status-dot status-green"></div>
                <div>
                  <strong>Working</strong>
                  <span>Scheme is functional and verified</span>
                </div>
              </div>
              <div className="status-item">
                <div className="status-dot status-yellow"></div>
                <div>
                  <strong>Partially Working</strong>
                  <span>Issues or partial implementation</span>
                </div>
              </div>
              <div className="status-item">
                <div className="status-dot status-red"></div>
                <div>
                  <strong>Not Working / Ignored</strong>
                  <span>Broken or ignored by officials</span>
                </div>
              </div>
              <div className="status-item">
                <div className="status-dot status-gray"></div>
                <div>
                  <strong>Unverified</strong>
                  <span>No reports yet — status unknown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Issues */}
      <section className="latest-section">
        <div className="container">
          <div className="latest-header">
            <div>
              <div className="section-label">Recent Activity</div>
              <h2>Latest Issues Reported</h2>
            </div>
            <Link to="/issues" className="btn btn-secondary">
              View All Issues
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          {loadingIssues ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading latest issues...</p>
            </div>
          ) : latestIssues.length === 0 ? (
            <div className="empty-card">
              <div className="empty-icon">📭</div>
              <h3>No Issues Reported Yet</h3>
              <p>Be the first to report an accessibility issue at a railway station.</p>
              <Link to="/report" className="btn btn-primary">Report an Issue</Link>
            </div>
          ) : (
            <div className="issues-grid">
              {latestIssues.map((issue, i) => (
                <div key={issue.id} className={`issue-card animate-fade-up delay-${(i + 1) * 100}`}>
                  <div className="issue-card-top">
                    <Link to={`/schemes/${issue.schemeId}`} className="issue-scheme-link">
                      {issue.schemeTitle || 'Railway Scheme'}
                    </Link>
                    <span className="issue-time-badge">{getTimeAgo(issue.createdAt)}</span>
                  </div>
                  <p className="issue-desc">{issue.description}</p>
                  <div className="issue-tags">
                    {issue.stationName && (
                      <span className="issue-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {issue.stationName}
                      </span>
                    )}
                    <span className="issue-tag issue-severity">
                      Severity {issue.severity}/5
                    </span>
                    {issue.issueType && (
                      <span className="issue-tag">{issue.issueType.replace(/_/g, ' ')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-bg-pattern"></div>
            <div className="cta-content">
              <h2>Ready to Make a Difference?</h2>
              <p>Join disabled people and advocates working to make railway stations truly accessible. Your voice matters.</p>
              <div className="cta-actions">
                <Link to="/signup" className="btn btn-large cta-btn-white">
                  Create Free Account
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link to="/schemes" className="btn btn-large cta-btn-outline">
                  Browse Schemes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
