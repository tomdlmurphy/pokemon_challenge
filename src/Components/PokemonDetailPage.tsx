import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Result} from '@coveo/headless';

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

interface DetailPageState {
  result: Result;
}

const PokemonDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as DetailPageState | null;
  const result = state?.result;

  if (!result) {
    return (
      <div style={{padding: '60px', textAlign: 'center'}}>
        <p style={{color: '#666', marginBottom: '16px'}}>
          No Pokemon data found. Please go back and click a result.
        </p>
        <button className="result-btn" onClick={() => navigate('/')}>
          Back to Search
        </button>
      </div>
    );
  }

  let pokemonTypes: string[] = [];
  const rawType = result.raw.pokemon_type;
  if (Array.isArray(rawType)) {
    pokemonTypes = Array.from(new Set(rawType as string[]));
  } else if (typeof rawType === 'string') {
    pokemonTypes = [rawType];
  }

  const pokemonImage      = result.raw.pokemon_image as string | undefined;
  const pokemonGeneration = result.raw.pokemon_generation as string | undefined;

  const accentColor = pokemonTypes.length > 0
    ? getTypeStyle(pokemonTypes[0]).bg
    : '#6390F0';

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa'}}>

      <header style={{
        background: accentColor,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 14px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Back
        </button>
        <h1 style={{margin: 0, color: '#fff', fontSize: '1.4rem', fontWeight: 700}}>
          {result.title}
        </h1>
      </header>

      <div style={{maxWidth: '800px', margin: '40px auto', padding: '0 24px'}}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>

          <div style={{
            display: 'flex',
            gap: '32px',
            padding: '32px',
            alignItems: 'flex-start',
            borderBottom: '1px solid #eee',
          }}>
            {pokemonImage && (
              <div style={{
                width: '160px',
                height: '160px',
                flexShrink: 0,
                background: '#f0f4ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={pokemonImage}
                  alt={result.title}
                  style={{width: '140px', height: '140px', objectFit: 'contain'}}
                />
              </div>
            )}

            <div style={{flex: 1}}>
              <h2 style={{margin: '0 0 12px 0', fontSize: '1.8rem', fontWeight: 800}}>
                {result.title}
              </h2>

              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
                {pokemonTypes.map((type) => {
                  const typeStyle = getTypeStyle(type);
                  return (
                    <span
                      key={type}
                      style={{
                        background: typeStyle.bg,
                        color: typeStyle.color,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '5px 14px',
                        borderRadius: '20px',
                      }}
                    >
                      {type}
                    </span>
                  );
                })}
              </div>

              {pokemonGeneration && (
                <p style={{margin: '0 0 8px 0', color: '#555', fontSize: '0.95rem'}}>
                  <strong>Generation:</strong> {pokemonGeneration}
                </p>
              )}

              <p style={{margin: 0, fontSize: '0.85rem', color: '#888'}}>
                {result.printableUri}
              </p>
            </div>
          </div>

          {result.excerpt && (
            <div style={{padding: '24px 32px', borderBottom: '1px solid #eee'}}>
              <h3 style={{margin: '0 0 10px 0', fontSize: '1rem', color: '#333'}}>
                Description
              </h3>
              <p style={{margin: 0, lineHeight: 1.7, color: '#555'}}>
                {result.excerpt}
              </p>
            </div>
          )}

          <div style={{padding: '20px 32px', display: 'flex', gap: '12px'}}>
            <button
              className="result-btn"
              onClick={() => window.open(result.uri, '_blank')}
              style={{padding: '10px 20px', fontSize: '0.95rem'}}
            >
              View on PokemonDB
            </button>
            <button
              className="result-btn"
              onClick={() => navigate(-1)}
              style={{padding: '10px 20px', fontSize: '0.95rem'}}
            >
              Back to Results
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
