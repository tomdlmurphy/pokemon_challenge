import React, {useEffect, useState} from 'react';
import {buildQuerySummary} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

const QuerySummary: React.FC = () => {
  const engine = useEngine();
  const [controller] = useState(() => buildQuerySummary(engine));
  const [summaryState, setSummaryState] = useState(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setSummaryState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

  if (summaryState.isLoading || !summaryState.hasResults) {
    return <span className="results-summary">No results</span>;
  }

  return (
    <span className="results-summary">
      Showing{' '}
      <strong>{summaryState.firstResult}–{summaryState.lastResult}</strong>
      {' '}of{' '}
      <strong>{summaryState.total}</strong> results
      {summaryState.query && (
        <> for <strong>"{summaryState.query}"</strong></>
      )}
    </span>
  );
};

export default QuerySummary;
