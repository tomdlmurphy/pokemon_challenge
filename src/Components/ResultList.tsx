import React from 'react';

interface ResultCardProps {
  tag: 'docs' | 'guide' | 'article' | 'api';
  title: string;
  url: string;
  excerpt: string;
  source: string;
  date: string;
}

const ResultCard: React.FC<ResultCardProps> = ({tag, title, url, excerpt, source, date}) => (
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

const ResultList: React.FC = () => {
  return (
    <section className="results-area">
      {PLACEHOLDER_RESULTS.length > 0 ? (
        PLACEHOLDER_RESULTS.map((result, i) => (
          <ResultCard key={i} {...result} />
        ))
      ) : (
        <div className="no-results" style={{display: 'block'}}>
          <div className="no-results-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try adjusting your search terms or removing filters.</p>
        </div>
      )}
    </section>
  );
};

export default ResultList;
