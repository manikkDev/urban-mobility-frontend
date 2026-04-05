import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireCitizen = false }) => {
  const { isAuthenticated, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userProfile?.role !== 'admin') {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="error-icon" style={{ fontSize: '64px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          You need admin privileges to access this page.
        </p>
        <a href="/" className="btn btn-primary">Go to Homepage</a>
      </div>
    );
  }

  if (requireCitizen && userProfile?.role !== 'citizen') {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="error-icon" style={{ fontSize: '64px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          This page is only accessible to citizen users.
        </p>
        <a href="/" className="btn btn-primary">Go to Homepage</a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
