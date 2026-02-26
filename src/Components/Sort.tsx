import React from 'react';

const Sort: React.FC = () => {
  return (
    <div className="sort-wrap">
      <span className="sort-label">Sort by</span>
      <select className="sort-select">
        <option>Relevance</option>
        <option>Date (newest)</option>
        <option>Date (oldest)</option>
        <option>Alphabetical</option>
      </select>
    </div>
  );
};

export default Sort;
