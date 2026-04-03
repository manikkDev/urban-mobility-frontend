import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSchemes } from '../api/stationApi';
import './SchemesDirectory.css';

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

const CATEGORY_LABELS = {
  escalator_access: 'Escalator Access',
  lift_access: 'Lift Access',
  ramp_access: 'Ramp Access',
  accessible_road: 'Accessible Road',
  footpath_access: 'Footpath Access',
  tactile_navigation: 'Tactile Navigation',
  pedestrian_crossing: 'Pedestrian Crossing',
  public_toilet_access: 'Public Toilet Access',
  public_entry_access: 'Public Entry Access',
  mixed_accessibility: 'Mixed Accessibility',
};

const SchemesDirectory = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const response = await getSchemes();
      if (response.success) {
        setSchemes(response.data);
      }
    } catch (err) {
      setError('Failed to load schemes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = schemes.filter((s) => {
    const matchesSearch = !search ||
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.areaName?.toLowerCase().includes(search.toLowerCase()) ||
      s.summary?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || s.category === categoryFilter;
    const matchesStatus = !statusFilter || s.publicStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading schemes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchSchemes}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="schemes-directory">
      <div className="container">
        <h1>Accessibility Schemes</h1>
        <p className="page-subtitle">Browse, search, and check the real status of government accessibility schemes</p>

        <div className="filters-bar">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by name, area, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No schemes found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="schemes-grid">
            {filtered.map((scheme) => (
              <Link to={`/schemes/${scheme.id}`} key={scheme.id} className="scheme-card">
                <div className="scheme-card-header">
                  <span
                    className="status-dot"
                    style={{ backgroundColor: STATUS_COLOR_HEX[scheme.statusColor] || '#6b7280' }}
                  />
                  <span className="status-label">{STATUS_LABELS[scheme.publicStatus] || 'Unknown'}</span>
                  {scheme.officialClaimMismatch && <span className="mismatch-badge">Mismatch</span>}
                </div>
                <h3 className="scheme-title">{scheme.title}</h3>
                <p className="scheme-area">{scheme.areaName}</p>
                <p className="scheme-summary">{scheme.summary}</p>
                <div className="scheme-card-footer">
                  <span className="category-tag">{CATEGORY_LABELS[scheme.category] || scheme.category}</span>
                  <span className="report-count">{scheme.reportCount || 0} reports</span>
                </div>
                <div className="scheme-official-status">
                  Official: <strong>{scheme.officialStatus?.replace('_', ' ')}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesDirectory;
