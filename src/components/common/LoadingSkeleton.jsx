import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="skeleton-table">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-row">
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="skeleton-text-block">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-line skeleton-text"></div>
        ))}
      </div>
    );
  }

  return <div className="skeleton-line"></div>;
};

export default LoadingSkeleton;
