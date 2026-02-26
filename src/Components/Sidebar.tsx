import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="dot" />
        Searchbase
      </div>

      <p className="sidebar-section-label">Navigation</p>
      <ul className="sidebar-nav">
        <li><a href="#" className="active"><span className="icon">🔍</span> Search</a></li>
        <li><a href="#"><span className="icon">📂</span> Browse</a></li>
        <li><a href="#"><span className="icon">⭐</span> Saved</a></li>
        <li><a href="#"><span className="icon">🕐</span> Recent</a></li>
      </ul>

      <div className="sidebar-divider" />

      <p className="sidebar-section-label">Sources</p>
      <ul className="sidebar-nav">
        <li><a href="#"><span className="icon">📄</span> Documentation</a></li>
        <li><a href="#"><span className="icon">📘</span> Knowledge Base</a></li>
        <li><a href="#"><span className="icon">🌐</span> Web</a></li>
      </ul>

      <div className="sidebar-divider" />

      <p className="sidebar-section-label">Settings</p>
      <ul className="sidebar-nav">
        <li><a href="#"><span className="icon">⚙️</span> Preferences</a></li>
        <li><a href="#"><span className="icon">🔌</span> Connected Sources</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
