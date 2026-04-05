import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRailwayIssues } from '../api/railwayReportApi';
import './IssueFeed.css';

const STATUS_COLOR_HEX = {
  green: '#16a34a',
  yellow: '#ca8a04',
  red: '#dc2626',
  gray: '#6b7280',
};

const CONDITION_COLOR = {
  working: 'green',
  partially_working: 'yellow',
  not_working: 'red',
  ignored: 'red',
  unverified: 'gray',
};

const CONDITION_LABELS = {
  working: 'Working',
  partially_working: 'Partially Working',
  not_working: 'Not Working',
  ignored: 'Ignored',
  unverified: 'Unverified',
};

const ISSUE_CATEGORY_LABELS = {
  equipment_failure: 'Equipment Failure',
  platform_access_problem: 'Platform Access Problem',
  pathway_blockage: 'Pathway Blockage',
  partial_implementation: 'Partial Implementation',
  official_neglect: 'Official Neglect',
  safety_risk: 'Safety Risk',
  signage_problem: 'Signage Problem',
  assistance_unavailable: 'Assistance Unavailable',
  other: 'Other',
};

const IssueFeed = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await getRailwayIssues();
      if (response.success) {
        setIssues(response.data);
      }
    } catch (err) {
      setError('Failed to load railway issues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = issues.filter((issue) => {
    const matchesCategory = !categoryFilter || issue.issueCategory === categoryFilter;
    const matchesSeverity = !severityFilter || issue.severity === parseInt(severityFilter);
    return matchesCategory && matchesSeverity;
  });

  if (loading) {
    return (
      <div className="issue-feed">
        <div className="container">
          <h1>Live Railway Issue Feed</h1>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading railway issues...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="issue-feed">
        <div className="container">
          <h1>Live Railway Issue Feed</h1>
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Issues</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchIssues}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

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

  const isRecent = (dateString) => {
    const diffMs = new Date() - new Date(dateString);
    return diffMs < 86400000; // Less than 24 hours
  };

  return (
    <div className="issue-feed">
      <div className="container">
        <h1>Live Railway Issue Feed</h1>
        <p className="page-subtitle">Real-time railway accessibility issues reported by passengers across all stations</p>

        <div className="filters-bar">
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {Object.entries(ISSUE_CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select className="form-select" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="">All Severities</option>
            <option value="5">Critical (5)</option>
            <option value="4">High (4)</option>
            <option value="3">Medium (3)</option>
            <option value="2">Low (2)</option>
            <option value="1">Very Minor (1)</option>
          </select>
        </div>

        <p className="results-count">{filtered.length} issue{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Railway Issues Found</h3>
            <p>No issues match your current filter criteria. Try adjusting your filters or check back later for new passenger reports.</p>
            <button className="btn btn-secondary" onClick={() => { setCategoryFilter(''); setSeverityFilter(''); }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="issues-list">
            {filtered.map((issue) => (
              <div key={issue.id} className={`issue-card ${isRecent(issue.createdAt) ? 'recent-issue' : ''}`}>
                <div className="issue-card-left">
                  <span
                    className="condition-dot"
                    style={{ backgroundColor: STATUS_COLOR_HEX[CONDITION_COLOR[issue.schemeCondition]] || '#6b7280' }}
                  />
                </div>
                <div className="issue-card-body">
                  <div className="issue-card-top">
                    <Link to={`/schemes/${issue.schemeId}`} className="issue-scheme-link">
                      {issue.schemeTitle || 'Unknown Railway Scheme'}
                    </Link>
                    <div className="issue-badges">
                      {isRecent(issue.createdAt) && <span className="new-badge">NEW</span>}
                      <span className="condition-badge-sm" style={{ backgroundColor: STATUS_COLOR_HEX[CONDITION_COLOR[issue.schemeCondition]] || '#6b7280' }}>
                        {CONDITION_LABELS[issue.schemeCondition] || issue.schemeCondition}
                      </span>
                      <span className={`severity-pill sev-${issue.severity}`}>
                        Severity {issue.severity}
                      </span>
                      {issue.officialClaimMismatch && <span className="mismatch-pill">Official Mismatch</span>}
                      {issue.ignoredByOfficials && <span className="ignored-pill">Ignored by Officials</span>}
                    </div>
                  </div>
                  <p className="issue-description">{issue.description}</p>
                  <div className="issue-meta">
                    <span className="issue-type">{issue.issueType?.replace(/_/g, ' ')}</span>
                    <span className="issue-category">{ISSUE_CATEGORY_LABELS[issue.issueCategory] || issue.issueCategory}</span>
                    {issue.stationName && <span>📍 {issue.stationName}</span>}
                    {issue.locationLabel && <span>{issue.locationLabel}</span>}
                    <span className="time-ago">🕐 {getTimeAgo(issue.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueFeed;
