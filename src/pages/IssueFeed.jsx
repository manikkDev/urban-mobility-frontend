import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRailwayIssues } from '../api/feedbackApi';
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
    return <div className="container"><div className="loading">Loading issues...</div></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchIssues}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="issue-feed">
      <div className="container">
        <h1>Public Issue Feed</h1>
        <p className="page-subtitle">Real accessibility issues reported by citizens across all schemes</p>

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
            <h3>No issues found</h3>
            <p>Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="issues-list">
            {filtered.map((issue) => (
              <div key={issue.id} className="issue-card">
                <div className="issue-card-left">
                  <span
                    className="condition-dot"
                    style={{ backgroundColor: STATUS_COLOR_HEX[CONDITION_COLOR[issue.schemeCondition]] || '#6b7280' }}
                  />
                </div>
                <div className="issue-card-body">
                  <div className="issue-card-top">
                    <Link to={`/schemes/${issue.schemeId}`} className="issue-scheme-link">
                      {issue.schemeTitle || 'Unknown Scheme'}
                    </Link>
                    <div className="issue-badges">
                      <span className="condition-badge-sm" style={{ backgroundColor: STATUS_COLOR_HEX[CONDITION_COLOR[issue.schemeCondition]] || '#6b7280' }}>
                        {CONDITION_LABELS[issue.schemeCondition] || issue.schemeCondition}
                      </span>
                      <span className={`severity-pill sev-${issue.severity}`}>
                        Severity {issue.severity}
                      </span>
                      {issue.officialClaimMismatch && <span className="mismatch-pill">Mismatch</span>}
                      {issue.ignoredByOfficials && <span className="ignored-pill">Officials Ignored</span>}
                    </div>
                  </div>
                  <p className="issue-description">{issue.description}</p>
                  <div className="issue-meta">
                    <span className="issue-type">{issue.issueType?.replace(/_/g, ' ')}</span>
                    <span className="issue-category">{ISSUE_CATEGORY_LABELS[issue.issueCategory] || issue.issueCategory}</span>
                    {issue.locationLabel && <span>{issue.locationLabel}</span>}
                    {issue.schemeAreaName && <span>{issue.schemeAreaName}</span>}
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
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
