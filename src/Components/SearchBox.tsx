import React, {useState} from 'react';

const FILTER_CHIPS = [
  {label: 'All',      filter: 'all',     count: 247},
  {label: 'Docs',     filter: 'docs',    count: 104},
  {label: 'Guides',   filter: 'guide',   count: 58},
  {label: 'Articles', filter: 'article', count: 73},
  {label: 'API Ref',  filter: 'api',     count: 12},
];

const SearchBox: React.FC = () => {
  const [query, setQuery]             = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">Search</h1>
        <span className="header-meta">Coveo · Pokémon Challenge</span>
      </div>

      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search documentation, articles, guides…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="search-clear"
            style={{display: 'block'}}
            onClick={() => setQuery('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="filter-row">
        <span className="filter-label">Show:</span>
        {FILTER_CHIPS.map((chip) => (
          <div
            key={chip.filter}
            className={`chip${activeFilter === chip.filter ? ' active' : ''}`}
            onClick={() => setActiveFilter(chip.filter)}
          >
            {chip.label}
            <span className="chip-count">{chip.count}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default SearchBox;
