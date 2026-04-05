import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'citizen' // Default to citizen
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
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
    
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      validationErrors.push('Full name must be at least 2 characters');
    }
    
    if (!formData.email) {
      validationErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.push('Please enter a valid email address');
    }
    
    if (!formData.password) {
      validationErrors.push('Password is required');
    } else if (formData.password.length < 6) {
      validationErrors.push('Password must be at least 6 characters');
    }
    
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { profile } = await signup(formData.email, formData.password, formData.fullName, formData.role);
      // Navigate based on actual profile role from backend
      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please log in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <h1>Create Your Account</h1>
            <p>Join the movement for accessible railway stations</p>
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
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Type *</label>
              <select
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="citizen">Citizen - Report railway accessibility issues</option>
                <option value="admin">Admin - Manage reports and schemes</option>
              </select>
              <p className="form-hint">
                {formData.role === 'citizen' 
                  ? 'As a citizen, you can report issues and track railway accessibility schemes.' 
                  : 'As an admin, you can review reports, manage schemes, and oversee the platform.'}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
            <p><Link to="/">Back to Homepage</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
