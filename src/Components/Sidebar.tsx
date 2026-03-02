import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="dot" />
        Tom Murphy - Pokemon Challenge 2026
      </div>

      <p className="sidebar-section-label">Navigation</p>
      <ul className="sidebar-nav">
        <li><a href="#" className="active"><span className="icon">🔍</span> Search</a></li>
        <li><a href="#"><span className="icon">📂</span> Browse</a></li>
        <li><a href="#"><span className="icon">⭐</span> Saved</a></li>
        <li><a href="#"><span className="icon">🕐</span> Recent</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
