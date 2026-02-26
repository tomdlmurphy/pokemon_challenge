import React, {useEffect, useState} from 'react';
import './SearchPage_2.css';

import SearchBox from './SearchBox';
import QuerySummary from './QuerySummary';
import ResultList from './ResultList';
import Pager from './Pager';
import Sort from './Sort';
import FacetList from './FacetList';
import ResultsPerPage from './ResultsPerPage';
import {SearchEngine} from '@coveo/headless';
import {EngineProvider} from '../common/engineContext_legacy';

// ── Types ──────────────────────────────────────────────────
interface ResultCardProps {
  tag: 'docs' | 'guide' | 'article' | 'api';
  title: string;
  url: string;
  excerpt: string;
  source: string;
  date: string;
}

interface FacetItemProps {
  name: string;
  count: number;
  checked?: boolean;
  onToggle: () => void;
}

interface ISearchPageProps {
  engine: SearchEngine;
}

// ── Subcomponents ──────────────────────────────────────────

const FacetItem: React.FC<FacetItemProps> = ({ name, count, checked = false, onToggle }) => (
  <div className={`facet-item${checked ? ' checked' : ''}`} onClick={onToggle}>
    <div className="facet-check">
      <div className="facet-box" />
      <span className="facet-name">{name}</span>
    </div>
    <span className="facet-count">{count}</span>
  </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ tag, title, url, excerpt, source, date }) => (
  <div className="result-card">
    <span className={`result-tag ${tag}`}>{tag}</span>
    <div className="result-title">{title}</div>
    <div className="result-url">{url}</div>
    <div className="result-excerpt">{excerpt}</div>
    <div className="result-footer">
      <span className="result-meta-item">📁 {source}</span>
      <span className="result-meta-item">🕐 {date}</span>
      <div className="result-actions">
        <button className="result-btn">Quick view</button>
        <button className="result-btn primary">Open ↗</button>
      </div>
    </div>
  </div>
);

// ── Static placeholder data ────────────────────────────────

const PLACEHOLDER_RESULTS: ResultCardProps[] = [
  {
    tag: 'docs',
    title: 'Add a Web source — Coveo Platform',
    url: 'docs.coveo.com › en › add-a-web-source',
    excerpt: 'The Web source crawler behaves similarly to bots of web search engines such as Google. The source only needs a starting URL and then automatically discovers all pages of the site.',
    source: 'Documentation',
    date: 'Updated Jan 14, 2025',
  },
  {
    tag: 'guide',
    title: 'Configuring crawling rules and inclusion filters',
    url: 'docs.coveo.com › en › crawling-rules',
    excerpt: 'Use inclusion and exclusion rules to precisely control which URLs your Web source indexes. Rules support wildcard expressions, regex patterns, and URL prefix matching.',
    source: 'Guides',
    date: 'Updated Dec 3, 2024',
  },
  {
    tag: 'api',
    title: 'Web source JSON configuration reference',
    url: 'docs.coveo.com › en › web-source-json',
    excerpt: 'Complete reference for advanced JSON configuration parameters including IndexExternalPages, IndexSubdomains, crawl delay, and page depth limits for Web and Sitemap sources.',
    source: 'API Reference',
    date: 'Updated Feb 1, 2025',
  },
  {
    tag: 'article',
    title: 'Understanding the difference between Rebuild, Rescan, and Refresh',
    url: 'docs.coveo.com › en › refresh-rescan-rebuild',
    excerpt: 'A rebuild re-indexes all content from scratch and removes items no longer reachable. A rescan re-crawls all items but only re-indexes changes.',
    source: 'Articles',
    date: 'Updated Nov 19, 2024',
  },
  {
    tag: 'docs',
    title: 'Monitor source activity and indexing progress',
    url: 'docs.coveo.com › en › monitor-source-activity',
    excerpt: 'Track indexing progress through the Activity panel, Log Browser, and Content Browser in the Coveo Administration Console.',
    source: 'Documentation',
    date: 'Updated Jan 22, 2025',
  },
];

const FILTER_CHIPS = [
  { label: 'All', filter: 'all', count: 247 },
  { label: 'Docs', filter: 'docs', count: 104 },
  { label: 'Guides', filter: 'guide', count: 58 },
  { label: 'Articles', filter: 'article', count: 73 },
  { label: 'API Ref', filter: 'api', count: 12 },
];

// ── Main Component ─────────────────────────────────────────

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const {engine} = props;
  useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePage, setActivePage] = useState(1);

  // Facet state — source
  const [sourceFacets, setSourceFacets] = useState({
    documentation: true,
    knowledgeBase: false,
    blog: false,
    apiReference: false,
  });

  // Facet state — date
  const [dateFacets, setDateFacets] = useState({
    last7: false,
    last30: false,
    last6months: false,
    allTime: true,
  });

  const toggleFacet = <T extends object>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T
  ) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <EngineProvider value={engine}>
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sidebar ── */}
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

      {/* ── Main ── */}
      <div className="main">

        {/* Header */}
        <header className="header">
          <div className="header-top">
            <h1 className="header-title">Search</h1>
            <span className="header-meta">Not connected to a source</span>
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
                style={{ display: 'block' }}
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

        {/* Body */}
        <div className="body">

          {/* Facets */}
          <aside className="facets">

            <div className="facet-group">
              <p className="facet-title">Source</p>
              <FacetItem name="Documentation" count={104} checked={sourceFacets.documentation} onToggle={() => toggleFacet(setSourceFacets, 'documentation')} />
              <FacetItem name="Knowledge Base" count={58}  checked={sourceFacets.knowledgeBase}  onToggle={() => toggleFacet(setSourceFacets, 'knowledgeBase')} />
              <FacetItem name="Blog"           count={73}  checked={sourceFacets.blog}           onToggle={() => toggleFacet(setSourceFacets, 'blog')} />
              <FacetItem name="API Reference"  count={12}  checked={sourceFacets.apiReference}   onToggle={() => toggleFacet(setSourceFacets, 'apiReference')} />
            </div>

            <div className="facet-group">
              <p className="facet-title">Date Modified</p>
              <FacetItem name="Last 7 days"   count={14}  checked={dateFacets.last7}      onToggle={() => toggleFacet(setDateFacets, 'last7')} />
              <FacetItem name="Last 30 days"  count={41}  checked={dateFacets.last30}     onToggle={() => toggleFacet(setDateFacets, 'last30')} />
              <FacetItem name="Last 6 months" count={98}  checked={dateFacets.last6months} onToggle={() => toggleFacet(setDateFacets, 'last6months')} />
              <FacetItem name="All time"      count={247} checked={dateFacets.allTime}    onToggle={() => toggleFacet(setDateFacets, 'allTime')} />
            </div>

            <div className="facet-group">
              <p className="facet-title">Topic</p>
              <FacetItem name="Configuration" count={34} checked={false} onToggle={() => {}} />
              <FacetItem name="Indexing"      count={29} checked={false} onToggle={() => {}} />
              <FacetItem name="Search UI"     count={21} checked={false} onToggle={() => {}} />
              <FacetItem name="Analytics"     count={18} checked={false} onToggle={() => {}} />
              <span className="facet-show-more">+ Show 6 more</span>
            </div>

          </aside>

          {/* Results */}
          <section className="results-area">

            <div className="results-toolbar">
              <span className="results-summary">
                Showing <strong>1–10</strong> of <strong>247</strong> results
              </span>
              <div className="sort-wrap">
                <span className="sort-label">Sort by</span>
                <select className="sort-select">
                  <option>Relevance</option>
                  <option>Date (newest)</option>
                  <option>Date (oldest)</option>
                  <option>Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="page-btn wide">← Prev</button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`page-btn${activePage === page ? ' active' : ''}`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              ))}
              <span style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>…</span>
              <button className="page-btn">25</button>
              <button className="page-btn wide">Next →</button>
            </div>

          </section>
        </div>
      </div>
    </div>
    </EngineProvider>
  );
};

export default SearchPage;
