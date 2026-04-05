import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './AllReports.css';

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    reviewStatus: '',
    severity: '',
    issueCategory: ''
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reports, filters]);

  const fetchAllReports = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/railway-issues');
      const reportsData = response.data.data || [];
      
      // Sort by newest first
      const sorted = reportsData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setReports(sorted);
      setFilteredReports(sorted);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      setError('Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    if (filters.reviewStatus) {
      filtered = filtered.filter(r => r.reviewStatus === filters.reviewStatus);
    }

    if (filters.severity) {
      filtered = filtered.filter(r => r.severity === parseInt(filters.severity));
    }

    if (filters.issueCategory) {
      filtered = filtered.filter(r => r.issueCategory === filters.issueCategory);
    }

    setFilteredReports(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      reviewStatus: '',
      severity: '',
      issueCategory: ''
    });
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

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      new: 'badge-new',
      under_review: 'badge-review',
      verified: 'badge-verified',
      escalated: 'badge-escalated',
      resolved: 'badge-resolved',
      rejected: 'badge-rejected'
    };
    return statusMap[status] || 'badge-new';
  };

  const getSeverityColor = (severity) => {
    if (severity >= 4) return '#dc2626';
    if (severity === 3) return '#f59e0b';
    return '#10b981';
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleMarkUnderReview = async (reportId) => {
    if (!window.confirm('Mark this report as under review?')) return;
    
    try {
      setUpdating(true);
      // In a real implementation, this would call an API endpoint
      // For now, we'll update the local state
      const updatedReports = reports.map(r => 
        r.id === reportId ? { ...r, reviewStatus: 'under_review' } : r
      );
      setReports(updatedReports);
      alert('Report marked as under review');
    } catch (err) {
      console.error('Failed to update report:', err);
      alert('Failed to update report status');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async (reportId, newStatus) => {
    if (!window.confirm(`Change report status to "${newStatus.replace(/_/g, ' ')}"?`)) return;
    
    try {
      setUpdating(true);
      const updatedReports = reports.map(r => 
        r.id === reportId ? { ...r, reviewStatus: newStatus } : r
      );
      setReports(updatedReports);
      setShowDetailModal(false);
      alert('Report status updated successfully');
    } catch (err) {
      console.error('Failed to update report:', err);
      alert('Failed to update report status');
    } finally {
      setUpdating(false);
    }
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <div className="all-reports-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading all reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-reports-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Failed to Load Reports</h3>
            <p>{error}</p>
            <button onClick={fetchAllReports} className="btn btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-reports-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>All Railway Reports</h1>
            <p>Review and manage all submitted accessibility reports</p>
          </div>
          <Link to="/admin" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="filters-section">
          <div className="filters-bar">
            <select 
              name="reviewStatus" 
              className="form-select" 
              value={filters.reviewStatus}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="under_review">Under Review</option>
              <option value="verified">Verified</option>
              <option value="escalated">Escalated</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select 
              name="severity" 
              className="form-select" 
              value={filters.severity}
              onChange={handleFilterChange}
            >
              <option value="">All Severities</option>
              <option value="5">Critical (5)</option>
              <option value="4">High (4)</option>
              <option value="3">Medium (3)</option>
              <option value="2">Low (2)</option>
              <option value="1">Very Minor (1)</option>
            </select>

            <select 
              name="issueCategory" 
              className="form-select" 
              value={filters.issueCategory}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="accessibility_infrastructure">Accessibility Infrastructure</option>
              <option value="safety_concern">Safety Concern</option>
              <option value="service_quality">Service Quality</option>
              <option value="facility_condition">Facility Condition</option>
            </select>

            {(filters.reviewStatus || filters.severity || filters.issueCategory) && (
              <button onClick={clearFilters} className="btn btn-secondary">
                Clear Filters
              </button>
            )}
          </div>

          <p className="results-count">
            {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredReports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Reports Found</h3>
            <p>No reports match your current filter criteria.</p>
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="reports-list">
            {filteredReports.map((report) => (
              <div key={report.id} className="admin-report-card">
                <div className="report-header">
                  <div className="report-meta">
                    <span className={`status-badge ${getStatusBadgeClass(report.reviewStatus)}`}>
                      {report.reviewStatus?.replace(/_/g, ' ') || 'New'}
                    </span>
                    <span className="severity-indicator" style={{ color: getSeverityColor(report.severity) }}>
                      Severity: {report.severity}/5
                    </span>
                    <span className="time-ago">{getTimeAgo(report.createdAt)}</span>
                  </div>
                </div>

                <div className="report-body">
                  <div className="report-scheme">
                    <strong>Scheme:</strong> {report.schemeId || 'N/A'}
                    {report.stationName && <span> • 🚉 {report.stationName}</span>}
                  </div>

                  <p className="report-description">{report.description}</p>

                  <div className="report-details">
                    {report.issueType && (
                      <span className="detail-badge">
                        {report.issueType.replace(/_/g, ' ')}
                      </span>
                    )}
                    {report.issueCategory && (
                      <span className="detail-badge category">
                        {report.issueCategory.replace(/_/g, ' ')}
                      </span>
                    )}
                    {report.locationLabel && (
                      <span className="detail-badge location">
                        📍 {report.locationLabel}
                      </span>
                    )}
                  </div>

                  {report.submittedByName && (
                    <div className="submitter-info">
                      <strong>Submitted by:</strong> {report.submittedByName}
                      {report.submittedByEmail && <span> ({report.submittedByEmail})</span>}
                    </div>
                  )}

                  {!report.submittedByName && (
                    <div className="submitter-info anonymous">
                      <strong>Anonymous Report</strong>
                    </div>
                  )}

                  {report.officialClaimMismatch && (
                    <div className="mismatch-alert">
                      ⚠️ Official claim mismatch detected
                    </div>
                  )}

                  {report.ignoredByOfficials && (
                    <div className="ignored-alert">
                      🚫 Reported as ignored by officials
                    </div>
                  )}
                </div>

                <div className="report-actions">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewDetails(report)}
                    disabled={updating}
                  >
                    View Details
                  </button>
                  {report.reviewStatus === 'new' && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => handleMarkUnderReview(report.id)}
                      disabled={updating}
                    >
                      Mark Under Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Report Detail Modal */}
        {showDetailModal && selectedReport && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Report Details</h2>
                <button className="modal-close" onClick={closeModal}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="detail-section">
                  <h3>Report Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Status:</strong>
                      <span className={`status-badge ${getStatusBadgeClass(selectedReport.reviewStatus)}`}>
                        {selectedReport.reviewStatus?.replace(/_/g, ' ') || 'New'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Severity:</strong>
                      <span style={{ color: getSeverityColor(selectedReport.severity), fontWeight: 600 }}>
                        {selectedReport.severity}/5
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Scheme ID:</strong>
                      <span>{selectedReport.schemeId}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Station:</strong>
                      <span>{selectedReport.stationName || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Issue Type:</strong>
                      <span>{selectedReport.issueType?.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Category:</strong>
                      <span>{selectedReport.issueCategory?.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Location:</strong>
                      <span>{selectedReport.locationLabel || 'Not specified'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Submitted:</strong>
                      <span>{new Date(selectedReport.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Description</h3>
                  <p className="report-description-full">{selectedReport.description}</p>
                </div>

                {selectedReport.submittedByName && (
                  <div className="detail-section">
                    <h3>Submitted By</h3>
                    <p><strong>Name:</strong> {selectedReport.submittedByName}</p>
                    <p><strong>Email:</strong> {selectedReport.submittedByEmail}</p>
                    <p><strong>User ID:</strong> {selectedReport.submittedByUid}</p>
                  </div>
                )}

                {!selectedReport.submittedByName && (
                  <div className="detail-section">
                    <p className="anonymous-notice">📝 This is an anonymous report</p>
                  </div>
                )}

                <div className="detail-section">
                  <h3>Update Status</h3>
                  <div className="status-actions">
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleUpdateStatus(selectedReport.id, 'under_review')}
                      disabled={updating || selectedReport.reviewStatus === 'under_review'}
                    >
                      Mark Under Review
                    </button>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpdateStatus(selectedReport.id, 'verified')}
                      disabled={updating || selectedReport.reviewStatus === 'verified'}
                    >
                      Mark Verified
                    </button>
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => handleUpdateStatus(selectedReport.id, 'escalated')}
                      disabled={updating || selectedReport.reviewStatus === 'escalated'}
                    >
                      Escalate
                    </button>
                    <button 
                      className="btn btn-sm"
                      style={{ background: '#10b981', color: 'white' }}
                      onClick={() => handleUpdateStatus(selectedReport.id, 'resolved')}
                      disabled={updating || selectedReport.reviewStatus === 'resolved'}
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReports;
