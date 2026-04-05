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
            <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
            <div className="stat-content">
              <h3>{stats.totalReports}</h3>
              <p>Total Reports</p>
            </div>
          </div>

          <div className="stat-card highlight-new">
            <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>
            <div className="stat-content">
              <h3>{stats.newReports}</h3>
              <p>New Reports</p>
            </div>
          </div>

          <div className="stat-card highlight-review">
            <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <div className="stat-content">
              <h3>{stats.underReview}</h3>
              <p>Under Review</p>
            </div>
          </div>

          <div className="stat-card highlight-escalated">
            <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <div className="stat-content">
              <h3>{stats.escalated}</h3>
              <p>Escalated</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="16" rx="2"/><path d="M4 10h16"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M8 18l-2 4"/><path d="M16 18l2 4"/></svg></div>
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
              <div className="action-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
              <h3>Review All Reports</h3>
              <p>View and manage all submitted railway accessibility reports</p>
            </a>

            <a href="/admin/schemes" className="action-card">
              <div className="action-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-4h6v4"/></svg></div>
              <h3>Manage Schemes</h3>
              <p>Update railway scheme statuses and information</p>
            </a>

            <a href="/admin/analytics" className="action-card">
              <div className="action-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
              <h3>View Analytics</h3>
              <p>Analyze trends and patterns in accessibility reports</p>
            </a>
          </div>
        </div>

        <div className="admin-info">
          <h2>Admin Capabilities</h2>
          <div className="capabilities-list">
            <div className="capability-item">
              <span className="capability-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
              <div>
                <strong>Review Reports</strong>
                <p>Change report status, add admin notes, and verify issues</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></span>
              <div>
                <strong>Escalate Issues</strong>
                <p>Escalate critical reports to higher authorities</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
              <div>
                <strong>Manage Schemes</strong>
                <p>Update scheme information and official status</p>
              </div>
            </div>
            <div className="capability-item">
              <span className="capability-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
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
