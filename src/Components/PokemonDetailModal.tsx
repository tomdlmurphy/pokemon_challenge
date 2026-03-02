import React, {useEffect} from 'react';
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

const getTypeStyle = (type: string) =>
  TYPE_COLORS[type.toLowerCase()] || {bg: '#777', color: '#fff'};

interface PokemonDetailModalProps {
  result: Result;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({result, onClose}) => {

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  let pokemonTypes: string[] = [];
  const rawType = result.raw.pokemon_type;
  if (Array.isArray(rawType)) {
    pokemonTypes = Array.from(new Set(rawType as string[]));
  } else if (typeof rawType === 'string') {
    pokemonTypes = [rawType];
  }

  const pokemonImage      = result.raw.pokemon_image as string | undefined;
  const pokemonGeneration = result.raw.pokemon_generation as string | undefined;
  const accentColor       = pokemonTypes.length > 0 ? getTypeStyle(pokemonTypes[0]).bg : '#6390F0';

  return (
    // Backdrop — click outside to close
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
    >
      {/* Modal card — stop clicks bubbling to backdrop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Coloured header */}
        <div style={{
          background: accentColor,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '16px 16px 0 0',
          flexShrink: 0,
        }}>
          <h2 style={{margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700}}>
            {result.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.25)',
              border: 'none',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Image + basic info */}
        <div style={{
          display: 'flex',
          gap: '24px',
          padding: '24px',
          alignItems: 'flex-start',
          borderBottom: '1px solid #eee',
        }}>
          {pokemonImage && (
            <div style={{
              width: '120px',
              height: '120px',
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
                style={{width: '100px', height: '100px', objectFit: 'contain'}}
              />
            </div>
          )}

          <div style={{flex: 1}}>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
              {pokemonTypes.map((type) => {
                const s = getTypeStyle(type);
                return (
                  <span key={type} style={{
                    background: s.bg,
                    color: s.color,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {type}
                  </span>
                );
              })}
            </div>

            {pokemonGeneration && (
              <p style={{margin: '0 0 8px 0', color: '#555', fontSize: '0.9rem'}}>
                <strong>Generation:</strong> {pokemonGeneration}
              </p>
            )}

            
            <a href={result.uri}
              target="_blank"
              rel="noreferrer"
              style={{fontSize: '0.8rem', color: '#888', wordBreak: 'break-all'}}
            >
              {result.printableUri}
            </a>
          </div>
        </div>

        {/* Description */}
        {result.excerpt && (
          <div style={{padding: '20px 24px', borderBottom: '1px solid #eee'}}>
            <h3 style={{margin: '0 0 8px 0', fontSize: '0.95rem', color: '#333'}}>
              Description
            </h3>
            <p style={{margin: 0, lineHeight: 1.7, color: '#555', fontSize: '0.9rem'}}>
              {result.excerpt}
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{padding: '16px 24px', display: 'flex', gap: '10px'}}>
          <button
            className="result-btn"
            onClick={() => window.open(result.uri, '_blank')}
            style={{padding: '9px 18px', fontSize: '0.9rem'}}
          >
            View on PokemonDB
          </button>
          <button
            className="result-btn"
            onClick={onClose}
            style={{padding: '9px 18px', fontSize: '0.9rem'}}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default PokemonDetailModal;