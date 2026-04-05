import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/axiosConfig';
import './Auth.css';

const Profile = () => {
  const { userProfile, logout, updateProfile, authToken } = useAuth();
  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '' });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      setFormData({ fullName: userProfile.fullName });
      fetchMyReports();
    }
  }, [userProfile]);

  const fetchMyReports = async () => {
    try {
      setLoadingReports(true);
      const response = await apiClient.get('/auth/my-reports', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMyReports(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors([]);
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrors(['Full name must be at least 2 characters']);
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ fullName: formData.fullName });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      setErrors([error.response?.data?.message || 'Failed to update profile']);
    } finally {
      setLoading(false);
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

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      new: 'badge-gray',
      under_review: 'badge-blue',
      verified: 'badge-green',
      escalated: 'badge-orange',
      resolved: 'badge-green',
      rejected: 'badge-red'
    };
    return statusMap[status] || 'badge-gray';
  };

  if (!userProfile) {
    return (
      <div className="container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Log Out
          </button>
        </div>

        {success && (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <p>{success}</p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="error-box">
            <div className="error-icon-small">⚠️</div>
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="profile-content">
          <div className="profile-card card">
            <div className="card-header">
              <h2>Account Information</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="btn btn-secondary btn-sm">
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditing(false);
                      setFormData({ fullName: userProfile.fullName });
                      setErrors([]);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{userProfile.fullName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userProfile.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Role:</span>
                  <span className="info-value">
                    <span className="role-badge">{userProfile.role}</span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Total Reports:</span>
                  <span className="info-value">{userProfile.reportCount || 0}</span>
                </div>
              </div>
            )}
          </div>

          <div className="my-reports-section">
            <div className="section-header">
              <h2>My Railway Issue Reports</h2>
              <Link to="/report" className="btn btn-primary btn-sm">
                Submit New Report
              </Link>
            </div>

            {loadingReports ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading your reports...</p>
              </div>
            ) : myReports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No Reports Yet</h3>
                <p>You haven't submitted any railway accessibility reports yet.</p>
                <Link to="/report" className="btn btn-primary">
                  Submit Your First Report
                </Link>
              </div>
            ) : (
              <div className="reports-list">
                {myReports.map((report) => (
                  <div key={report.id} className="report-card card">
                    <div className="report-header">
                      <Link to={`/schemes/${report.schemeId}`} className="report-scheme-link">
                        {report.schemeTitle || 'Railway Scheme'}
                      </Link>
                      <span className="report-time">{getTimeAgo(report.createdAt)}</span>
                    </div>
                    <p className="report-description">{report.description}</p>
                    <div className="report-meta">
                      {report.stationName && <span>🚉 {report.stationName}</span>}
                      <span>Severity: {report.severity}/5</span>
                      {report.issueType && <span>{report.issueType.replace(/_/g, ' ')}</span>}
                    </div>
                    <div className="report-status">
                      <span className={`status-badge ${getStatusBadgeClass(report.reviewStatus)}`}>
                        {report.reviewStatus?.replace(/_/g, ' ') || 'New'}
                      </span>
                      {report.escalationStatus && report.escalationStatus !== 'not_started' && (
                        <span className="escalation-badge">
                          Escalation: {report.escalationStatus.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
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

export default Profile;
