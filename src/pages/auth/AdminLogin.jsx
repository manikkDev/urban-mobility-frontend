import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/axiosConfig';
import './Auth.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const validationErrors = [];
    if (!formData.email) {
      validationErrors.push('Email is required');
    }
    if (!formData.password) {
      validationErrors.push('Password is required');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await login(formData.email, formData.password);
      const token = await userCredential.user.getIdToken();

      try {
        const profileResponse = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userRole = profileResponse.data.data.role;

        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          setErrors(['Access denied. Admin privileges required.']);
          setLoading(false);
          return;
        }
      } catch (profileError) {
        console.error('Profile fetch after admin login failed:', profileError);
        setErrors(['Signed in successfully, but we could not verify admin access right now. Please try again.']);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Failed to log in. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No admin account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      }
      
      setErrors([errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-header-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h1>Admin Portal</h1>
            <p>Sign in to the administration dashboard</p>
          </div>

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

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Admin Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="admin@railway.gov.in"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter admin password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Admin Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p><Link to="/">Back to Homepage</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
