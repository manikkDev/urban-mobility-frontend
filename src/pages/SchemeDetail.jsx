import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRailwaySchemeById } from '../api/railwaySchemeApi';
import './SchemeDetail.css';

const STATUS_COLOR_HEX = {
  green: '#16a34a',
  yellow: '#ca8a04',
  red: '#dc2626',
  gray: '#6b7280',
};

const STATUS_LABELS = {
  working: 'Working',
  partially_working: 'Partially Working',
  not_working: 'Not Working',
  ignored: 'Ignored',
  unverified: 'Unverified',
};

const CONDITION_LABELS = {
  working: 'Working',
  partially_working: 'Partially Working',
  not_working: 'Not Working',
  ignored: 'Ignored',
  unverified: 'Unverified',
};

const SchemeDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      setLoading(true);
      const response = await getRailwaySchemeById(id);
      if (response.success) {
        setData(response.data);
      }
    } catch (err) {
      setError('Failed to load railway scheme details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="scheme-detail">
        <div className="container">
          <Link to="/schemes" className="back-link">&larr; Back to Railway Schemes</Link>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading railway scheme details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="scheme-detail">
        <div className="container">
          <Link to="/schemes" className="back-link">&larr; Back to Railway Schemes</Link>
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Railway Scheme Not Found</h3>
            <p>{error || 'The requested railway scheme could not be found.'}</p>
            <Link to="/schemes" className="btn btn-primary">Browse All Railway Schemes</Link>
          </div>
        </div>
      </div>
    );
  }

  const { scheme, recentReports, analytics } = data;

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
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

  return (
    <div className="scheme-detail">
      <div className="container">
        <Link to="/schemes" className="back-link">&larr; Back to Railway Schemes</Link>

        <div className="detail-header">
          <div className="detail-status-row">
            <span
              className="status-badge-large"
              style={{ backgroundColor: STATUS_COLOR_HEX[scheme.statusColor] || '#6b7280' }}
            >
              {STATUS_LABELS[scheme.publicStatus] || 'Unknown'}
            </span>
            {scheme.officialStatus && (
              <span className="official-badge">Official: {scheme.officialStatus.replace('_', ' ')}</span>
            )}
            {scheme.officialClaimMismatch && <span className="mismatch-badge-large">Official Mismatch</span>}
          </div>
          <h1>{scheme.title}</h1>
          <p className="detail-area">🚉 {scheme.stationName || scheme.areaName}</p>
          {scheme.divisionName && <p className="detail-division">Division: {scheme.divisionName}</p>}
          <p className="detail-authority">Authority: {scheme.authorityName}</p>
          {scheme.lastReportedAt && (
            <p className="last-reported">Last reported: {getTimeAgo(scheme.lastReportedAt)}</p>
          )}
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <div className="card">
              <h2>Description</h2>
              <p>{scheme.description}</p>
              {scheme.locationLabels && scheme.locationLabels.length > 0 && (
                <div className="location-tags">
                  <strong>Locations:</strong>
                  {scheme.locationLabels.map((loc, i) => (
                    <span key={i} className="location-tag">{loc}</span>
                  ))}
                </div>
              )}
              {scheme.tags && scheme.tags.length > 0 && (
                <div className="tag-list">
                  {scheme.tags.map((tag, i) => (
                    <span key={i} className="tag-chip">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <div className="status-comparison">
                <h2>Official vs Public Status</h2>
                <div className="comparison-grid">
                  <div className="comparison-item">
                    <span className="comparison-label">Official Status</span>
                    <span className="comparison-value official">{scheme.officialStatus?.replace('_', ' ')}</span>
                  </div>
                  <div className="comparison-item">
                    <span className="comparison-label">Public Status</span>
                    <span
                      className="comparison-value public"
                      style={{ color: STATUS_COLOR_HEX[scheme.statusColor] }}
                    >
                      {STATUS_LABELS[scheme.publicStatus]}
                    </span>
                  </div>
                </div>
                {scheme.officialStatus === 'completed' && (scheme.publicStatus === 'not_working' || scheme.publicStatus === 'ignored') && (
                  <div className="mismatch-alert">
                    ⚠️ Railway officials claim this scheme is completed, but passenger reports indicate it is {STATUS_LABELS[scheme.publicStatus]?.toLowerCase()}.
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2>Recent Railway Reports ({recentReports?.length || 0})</h2>
              {(!recentReports || recentReports.length === 0) ? (
                <p className="no-reports">No passenger reports yet. Be the first to report a railway accessibility issue.</p>
              ) : (
                <div className="reports-list">
                  {recentReports.map((report) => (
                    <div key={report.id} className="report-item">
                      <div className="report-header">
                        <span
                          className="condition-badge"
                          style={{ backgroundColor: STATUS_COLOR_HEX[
                            report.schemeCondition === 'working' ? 'green' :
                            report.schemeCondition === 'partially_working' ? 'yellow' :
                            report.schemeCondition === 'ignored' ? 'red' :
                            report.schemeCondition === 'not_working' ? 'red' : 'gray'
                          ] }}
                        >
                          {CONDITION_LABELS[report.schemeCondition] || report.schemeCondition}
                        </span>
                        <span className="severity-badge">Severity: {report.severity}/5</span>
                        {report.officialClaimMismatch && <span className="mismatch-tag">Official Mismatch</span>}
                        {report.ignoredByOfficials && <span className="ignored-tag">Ignored</span>}
                      </div>
                      <p className="report-description">{report.description}</p>
                      <div className="report-meta">
                        {report.stationName && <span>🚉 {report.stationName}</span>}
                        {report.locationLabel && <span>📍 {report.locationLabel}</span>}
                        <span>{report.issueType?.replace(/_/g, ' ')}</span>
                        <span className="time-ago">🕐 {getTimeAgo(report.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link to={`/report?schemeId=${scheme.id}`} className="btn btn-primary" style={{ marginTop: '16px' }}>
                Report Railway Issue for This Scheme
              </Link>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="card">
              <h3>Quick Stats</h3>
              <div className="stat-row"><span>Total Reports</span><strong>{scheme.reportCount || 0}</strong></div>
              <div className="stat-row"><span>Open Issues</span><strong>{scheme.openIssueCount || 0}</strong></div>
              <div className="stat-row"><span>Attention Score</span><strong>{scheme.attentionScore || 0}/100</strong></div>
              <div className="stat-row"><span>Category</span><strong style={{ textTransform: 'capitalize' }}>{scheme.category?.replace(/_/g, ' ')}</strong></div>
            </div>

            {analytics && analytics.categoryCounts && Object.keys(analytics.categoryCounts).length > 0 && (
              <div className="card">
                <h3>Issue Breakdown</h3>
                {Object.entries(analytics.categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="stat-row">
                    <span style={{ textTransform: 'capitalize' }}>{cat.replace(/_/g, ' ')}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
