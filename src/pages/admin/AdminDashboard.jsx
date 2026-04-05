import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/axiosConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalReports: 0,
    newReports: 0,
    underReview: 0,
    escalated: 0,
    totalSchemes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all reports
      const reportsResponse = await apiClient.get('/railway-issues');
      const reports = reportsResponse.data.data || [];
      
      // Fetch all schemes
      const schemesResponse = await apiClient.get('/railway-schemes');
      const schemes = schemesResponse.data.data || [];
      
      // Calculate statistics
      const newReports = reports.filter(r => r.reviewStatus === 'new').length;
      const underReview = reports.filter(r => r.reviewStatus === 'under_review').length;
      const escalated = reports.filter(r => r.escalationStatus === 'escalated' || r.escalationStatus === 'in_progress').length;
      
      setStats({
        totalReports: reports.length,
        newReports,
        underReview,
        escalated,
        totalSchemes: schemes.length
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {userProfile?.fullName}</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.totalReports}</h3>
              <p>Total Reports</p>
            </div>
          </div>

          <div className="stat-card highlight-new">
            <div className="stat-icon">🆕</div>
            <div className="stat-content">
              <h3>{stats.newReports}</h3>
              <p>New Reports</p>
            </div>
          </div>

          <div className="stat-card highlight-review">
            <div className="stat-icon">🔍</div>
            <div className="stat-content">
              <h3>{stats.underReview}</h3>
              <p>Under Review</p>
            </div>
          </div>

          <div className="stat-card highlight-escalated">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>{stats.escalated}</h3>
              <p>Escalated</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚉</div>
            <div className="stat-content">
              <h3>{stats.totalSchemes}</h3>
              <p>Railway Schemes</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/admin/reports" className="action-card">
              <div className="action-icon">📋</div>
              <h3>Review All Reports</h3>
              <p>View and manage all submitted railway accessibility reports</p>
            </a>

            <a href="/admin/schemes" className="action-card">
              <div className="action-icon">🏗️</div>
              <h3>Manage Schemes</h3>
              <p>Update railway scheme statuses and information</p>
            </a>

            <a href="/admin/analytics" className="action-card">
              <div className="action-icon">📈</div>
              <h3>View Analytics</h3>
              <p>Analyze trends and patterns in accessibility reports</p>
            </a>
          </div>
        </div>

        <div className="admin-info">
          <h2>Admin Capabilities</h2>
          <div className="capabilities-list">
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <div>
                <strong>Review Reports</strong>
                <p>Change report status, add admin notes, and verify issues</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon">🔄</span>
              <div>
                <strong>Escalate Issues</strong>
                <p>Escalate critical reports to higher authorities</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon">📝</span>
              <div>
                <strong>Manage Schemes</strong>
                <p>Update scheme information and official status</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon">👥</span>
              <div>
                <strong>View All Reports</strong>
                <p>Access all citizen-submitted and anonymous reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
