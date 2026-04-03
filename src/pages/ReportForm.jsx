import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSchemes } from '../api/stationApi';
import { submitReport } from '../api/feedbackApi';
import './ReportForm.css';

const ISSUE_TYPES = [
  { value: 'broken_escalator', label: 'Broken Escalator' },
  { value: 'lift_not_working', label: 'Lift Not Working' },
  { value: 'damaged_ramp', label: 'Damaged Ramp' },
  { value: 'inaccessible_road', label: 'Inaccessible Road' },
  { value: 'blocked_footpath', label: 'Blocked Footpath' },
  { value: 'missing_tactile_path', label: 'Missing Tactile Path' },
  { value: 'unsafe_crossing', label: 'Unsafe Crossing' },
  { value: 'signage_missing', label: 'Signage Missing' },
  { value: 'scheme_not_started', label: 'Scheme Not Started' },
  { value: 'partial_implementation', label: 'Partial Implementation' },
  { value: 'ignored_by_officials', label: 'Ignored by Officials' },
  { value: 'scheme_non_functional', label: 'Scheme Non-Functional' },
  { value: 'other', label: 'Other' },
];

const SCHEME_CONDITIONS = [
  { value: 'working', label: 'Working' },
  { value: 'partially_working', label: 'Partially Working' },
  { value: 'not_working', label: 'Not Working' },
  { value: 'ignored', label: 'Ignored by Officials' },
];

const ReportForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedSchemeId = searchParams.get('schemeId') || '';

  const [schemes, setSchemes] = useState([]);
  const [formData, setFormData] = useState({
    schemeId: preSelectedSchemeId,
    issueType: '',
    severity: 3,
    description: '',
    schemeCondition: '',
    locationLabel: '',
    ignoredByOfficials: false,
  });
  const [loading, setLoading] = useState(false);
  const [schemesLoading, setSchemesLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await getSchemes();
      if (response.success) {
        setSchemes(response.data);
      }
    } catch (err) {
      console.error('Failed to load schemes');
    } finally {
      setSchemesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'description') {
      setCharCount(value.length);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              name === 'severity' ? parseInt(value) : value,
    }));
    setErrors([]);
  };

  const validateForm = () => {
    const validationErrors = [];
    if (!formData.schemeId) validationErrors.push('Please select a scheme');
    if (!formData.description || formData.description.trim().length < 10) {
      validationErrors.push('Description must be at least 10 characters');
    }
    if (formData.description && formData.description.trim().length > 1000) {
      validationErrors.push('Description must not exceed 1000 characters');
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        schemeId: formData.schemeId,
        description: formData.description.trim(),
        severity: formData.severity,
        ...(formData.issueType && { issueType: formData.issueType }),
        ...(formData.schemeCondition && { schemeCondition: formData.schemeCondition }),
        ...(formData.locationLabel.trim() && { locationLabel: formData.locationLabel.trim() }),
        ignoredByOfficials: formData.ignoredByOfficials,
      };

      const response = await submitReport(payload);
      if (response.success) {
        setSuccess('Thank you! Your report has been submitted and will help improve accessibility.');
        setFormData({
          schemeId: '',
          issueType: '',
          severity: 3,
          description: '',
          schemeCondition: '',
          locationLabel: '',
          ignoredByOfficials: false,
        });
        setCharCount(0);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Unable to submit report. Please try again.';
      const errorList = err.response?.data?.errors || [];
      if (errorList.length > 0) {
        setErrors(errorList);
      } else {
        setErrors([errorMessage]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="container">
        <h1>Report an Accessibility Issue</h1>
        <p className="page-subtitle">
          Help us track the real status of accessibility schemes. Your report makes a difference.
        </p>

        {success && (
          <div className="success-box">
            <p>{success}</p>
            <button className="btn btn-primary" onClick={() => navigate('/schemes')} style={{ marginTop: '12px' }}>
              View Schemes
            </button>
          </div>
        )}

        {errors.length > 0 && (
          <div className="error-box">
            <strong>Please fix the following:</strong>
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="report-form card">
          <div className="form-group">
            <label className="form-label">Select Scheme *</label>
            {schemesLoading ? (
              <p>Loading schemes...</p>
            ) : (
              <select
                name="schemeId"
                className="form-select"
                value={formData.schemeId}
                onChange={handleChange}
              >
                <option value="">-- Choose a scheme --</option>
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.areaName})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Describe the Issue *</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Describe what you observed. Be specific about the location and the problem..."
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
            <span className="char-count">{charCount}/1000</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Issue Type</label>
              <select name="issueType" className="form-select" value={formData.issueType} onChange={handleChange}>
                <option value="">Auto-detect from description</option>
                {ISSUE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Scheme Condition</label>
              <select name="schemeCondition" className="form-select" value={formData.schemeCondition} onChange={handleChange}>
                <option value="">Auto-detect from description</option>
                {SCHEME_CONDITIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Severity: {formData.severity} / 5</label>
            <input
              type="range"
              name="severity"
              min="1"
              max="5"
              value={formData.severity}
              onChange={handleChange}
              className="severity-slider"
            />
            <div className="severity-labels">
              <span>1 - Very Minor</span>
              <span>3 - Medium</span>
              <span>5 - Critical</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location Label (optional)</label>
            <input
              type="text"
              name="locationLabel"
              className="form-input"
              placeholder="e.g., Main entrance, Platform 1, Near bus stop..."
              value={formData.locationLabel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="ignoredByOfficials"
                checked={formData.ignoredByOfficials}
                onChange={handleChange}
              />
              <span>Officials have been informed but have ignored this issue</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
