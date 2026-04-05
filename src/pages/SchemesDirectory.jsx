import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRailwaySchemes } from '../api/railwaySchemeApi';
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
  lift_access: 'Railway Lift Access',
  escalator_access: 'Railway Escalator Access',
  ramp_access: 'Railway Ramp Access',
  platform_access: 'Platform Access',
  foot_over_bridge_access: 'FOB Access',
  tactile_navigation: 'Tactile Navigation',
  wheelchair_support: 'Wheelchair Support',
  disability_assistance: 'Disability Assistance',
  accessible_toilet_access: 'Accessible Toilets',
  station_entry_access: 'Station Entry Access',
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
      const response = await getRailwaySchemes();
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
      <div className="schemes-directory">
        <div className="container">
          <h1>Railway Disability Schemes</h1>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading railway schemes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schemes-directory">
        <div className="container">
          <h1>Railway Disability Schemes</h1>
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Schemes</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchSchemes}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `Updated ${diffHours}h ago`;
    if (diffDays < 7) return `Updated ${diffDays}d ago`;
    return `Updated ${date.toLocaleDateString()}`;
  };

  return (
    <div className="schemes-directory">
      <div className="container">
        <h1>Railway Disability Schemes</h1>
        <p className="page-subtitle">Browse railway accessibility schemes and check real ground status at stations</p>

        <div className="filters-bar">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by scheme name, station, or keyword..."
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

        <p className="results-count">{filtered.length} railway scheme{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No Railway Schemes Found</h3>
            <p>No schemes match your current search or filter criteria.</p>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setCategoryFilter(''); setStatusFilter(''); }}>
              Clear All Filters
            </button>
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
                  {scheme.officialClaimMismatch && <span className="mismatch-badge">Official Mismatch</span>}
                </div>
                <h3 className="scheme-title">{scheme.title}</h3>
                <p className="scheme-area">🚉 {scheme.stationName || scheme.areaName}</p>
                <p className="scheme-summary">{scheme.summary}</p>
                <div className="scheme-card-footer">
                  <span className="category-tag">{CATEGORY_LABELS[scheme.category] || scheme.category}</span>
                  <span className="report-count">{scheme.reportCount || 0} reports</span>
                  {scheme.openIssueCount > 0 && <span className="open-issues">{scheme.openIssueCount} open</span>}
                  {scheme.lastReportedAt && <span className="last-updated">{getTimeAgo(scheme.lastReportedAt)}</span>}
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
