import React, {useEffect, useState} from 'react';
import {buildResultList, Result} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

// ── Result Card ────────────────────────────────────────────

const ResultCard: React.FC<{result: Result}> = ({result}) => {
  const tag = (result.raw.filetype as string) ?? 'docs';
    const date = result.raw.date
        ? new Date(result.raw.date as unknown as number).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        })
        : 'Unknown date';

  return (
    <div className="result-card">
      <span className="result-tag docs">{tag}</span>
      <div className="result-title">{result.title}</div>
      <div className="result-url">{result.printableUri}</div>
      <div className="result-excerpt">{result.excerpt}</div>
      <div className="result-footer">
        <span className="result-meta-item">📁 {result.raw.source as string}</span>
        <span className="result-meta-item">🕐 {date}</span>
        <div className="result-actions">
          <button className="result-btn" onClick={() => window.open(result.uri, '_blank')}>
            Open ↗
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Result List ────────────────────────────────────────────

const ResultList: React.FC = () => {
  const engine = useEngine();

  // Build the controller once
  const [controller] = useState(() => buildResultList(engine));

  // Keep a local copy of the controller's state so React re-renders on updates
  const [resultState, setResultState] = useState(controller.state);

  useEffect(() => {
    // Subscribe: whenever Coveo updates the results, sync into React state
    const unsubscribe = controller.subscribe(() => {
      setResultState(controller.state);
    });
    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [controller]);

  if (resultState.isLoading) {
    return <div style={{padding: '40px', color: 'var(--text-muted)'}}>Loading results…</div>;
  }

  if (resultState.results.length === 0) {
    return (
      <div className="no-results" style={{display: 'block'}}>
        <div className="no-results-icon">🔍</div>
        <h3>No results found</h3>
        <p>Try adjusting your search terms or removing filters.</p>
      </div>
    );
  }

  return (
    <section className="results-area">
      {resultState.results.map((result) => (
        <ResultCard key={result.uniqueId} result={result} />
      ))}
    </section>
  );
};

export default ResultList;
