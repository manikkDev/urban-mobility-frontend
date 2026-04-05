import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireCitizen = false }) => {
  const { isAuthenticated, userProfile, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        padding: '40px'
      }}>
        <div className="loading-spinner" style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for user profile to load before checking roles
  if (!userProfile) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        padding: '40px'
      }}>
        <div className="loading-spinner" style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Loading your profile...</p>
      </div>
    );
  }

  // Check admin access
  if (requireAdmin && userProfile.role !== 'admin') {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="error-icon" style={{ fontSize: '64px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          You need admin privileges to access this page.
        </p>
        <a href="/" className="btn btn-primary" style={{
          padding: '10px 24px',
          background: '#2563eb',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          display: 'inline-block'
        }}>Go to Homepage</a>
      </div>
    );
  }

  // Check citizen access
  if (requireCitizen && userProfile.role !== 'citizen') {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="error-icon" style={{ fontSize: '64px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          This page is only accessible to citizen users.
        </p>
        <a href="/" className="btn btn-primary" style={{
          padding: '10px 24px',
          background: '#2563eb',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          display: 'inline-block'
        }}>Go to Homepage</a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
