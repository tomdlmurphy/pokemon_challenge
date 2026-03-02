import React, {useEffect, useState} from 'react';
import {buildResultList, Result} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

// ── Type Colors ────────────────────────────────────────────

const TYPE_COLORS: Record<string, {bg: string; color: string}> = {
  normal:   {bg: '#A8A77A', color: '#fff'},
  fire:     {bg: '#EE8130', color: '#fff'},
  water:    {bg: '#6390F0', color: '#fff'},
  electric: {bg: '#F7D02C', color: '#333'},
  grass:    {bg: '#7AC74C', color: '#fff'},
  ice:      {bg: '#96D9D6', color: '#333'},
  fighting: {bg: '#C22E28', color: '#fff'},
  poison:   {bg: '#A33EA1', color: '#fff'},
  ground:   {bg: '#E2BF65', color: '#333'},
  flying:   {bg: '#A98FF3', color: '#fff'},
  psychic:  {bg: '#F95587', color: '#fff'},
  bug:      {bg: '#A6B91A', color: '#fff'},
  rock:     {bg: '#B6A136', color: '#fff'},
  ghost:    {bg: '#735797', color: '#fff'},
  dragon:   {bg: '#6F35FC', color: '#fff'},
  dark:     {bg: '#705746', color: '#fff'},
  steel:    {bg: '#B7B7CE', color: '#333'},
  fairy:    {bg: '#D685AD', color: '#fff'},
};

const getTypeStyle = (type: string): {bg: string; color: string} => {
  const key = type.toLowerCase();
  return TYPE_COLORS[key] || {bg: '#777', color: '#fff'};
};

// ── Result Card ────────────────────────────────────────────

const ResultCard: React.FC<{result: Result; onSelect: (result: Result) => void}> = ({result, onSelect}) => {

  let pokemonTypes: string[] = [];
  const rawType = result.raw.pokemon_type;

  if (Array.isArray(rawType)) {
    const deduped = new Set(rawType as string[]);
    pokemonTypes = Array.from(deduped);
  } else if (typeof rawType === 'string') {
    pokemonTypes = [rawType];
  }

  const pokemonImage      = result.raw.pokemon_image as string | undefined;
  const pokemonGeneration = result.raw.pokemon_generation as string | undefined;
    const date = result.raw.date
        ? new Date(result.raw.date as unknown as number).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        })
    : null;

  return (
    <div className="result-card" style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>

      {/* Pokemon image */}
      {pokemonImage && (
        <div
          onClick={() => onSelect(result)}
          style={{
          width: '90px',
          height: '90px',
          flexShrink: 0,
          background: '#f0f4ff',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <img
            src={pokemonImage}
            alt={result.title}
            style={{width: '80px', height: '80px', objectFit: 'contain'}}
          />
        </div>
      )}

      {/* Card content */}
      <div style={{flex: 1, minWidth: 0}}>
        <div
          className="result-title"
          style={{cursor: 'pointer'}}
          onClick={() => onSelect(result)}
        >
          {result.title}
        </div>
      <div className="result-url">{result.printableUri}</div>
      <div className="result-excerpt">{result.excerpt}</div>
      <div className="result-footer">
          {pokemonTypes.map((type) => {
            const typeStyle = getTypeStyle(type);
            return (
              <span key={type} style={{
                  background: typeStyle.bg,
                  color: typeStyle.color,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '3px 9px',
                  borderRadius: '4px',
              }}>
                {type}
              </span>
            );
          })}
          {pokemonGeneration && (
            <span className="result-meta-item">{pokemonGeneration}</span>
          )}
          {date && (
            <span className="result-meta-item">{date}</span>
          )}
        <div className="result-actions">
            <button className="result-btn" onClick={() => onSelect(result)}>
              View Details
            </button>
          <button className="result-btn" onClick={() => window.open(result.uri, '_blank')}>
              Open
          </button>
        </div>
      </div>
      </div>

    </div>
  );
};

// ── Result List ────────────────────────────────────────────
const ResultList: React.FC<{onSelect: (result: Result) => void}> = ({onSelect}) => {
  const engine = useEngine();

  // Build the controller once
  const [controller] = useState(() => buildResultList(engine, {
    options: {
      fieldsToInclude: ['pokemon_image', 'pokemon_type', 'pokemon_generation']
    }
  }));

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
        <ResultCard key={result.uniqueId} result={result} onSelect={onSelect} />
      ))}
    </section>
  );
};

export default ResultList;