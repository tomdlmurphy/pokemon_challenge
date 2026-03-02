import React, { useEffect, useState, KeyboardEvent } from 'react';
import { buildSearchBox } from '@coveo/headless';
import { useEngine } from '../common/engineContext';

const SearchBox: React.FC = () => {
  const engine = useEngine(); 

  // Build the controller once — numberOfSuggestions enables Query Suggest
  const [controller] = useState(() =>
    buildSearchBox(engine, {
      options: {
        numberOfSuggestions: 5,
      },
    })
  );

  // Local copy of controller state
  const [searchBoxState, setSearchBoxState] = useState(controller.state);

  // Controls whether the suggestions dropdown is visible
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setSearchBoxState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

  // Update text in Coveo as the user types and show suggestions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controller.updateText(e.target.value);
    setShowSuggestions(true);
  };

  // Submit on Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      controller.submit();
      setShowSuggestions(false);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Clear the input
  const handleClear = () => {
    controller.clear();
    setShowSuggestions(false);
  };

  // When the user clicks a suggestion
  const handleSuggestionClick = (rawValue: string) => {
    controller.selectSuggestion(rawValue);
    setShowSuggestions(false);
  };

  // Hide suggestions when focus leaves the search area
  const handleBlur = () => {
    // Small timeout so the click on a suggestion registers before blur hides it
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const hasSuggestions =
    showSuggestions && searchBoxState.suggestions.length > 0;

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    listStyle: 'none',
    margin: 0,
    padding: '4px 0',
    zIndex: 100,
  };

  const suggestionItemStyle: React.CSSProperties = {
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
  };

  const suggestionItemHoverStyle: React.CSSProperties = {
    ...suggestionItemStyle,
    backgroundColor: '#f5f5f5',
  };

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">Search</h1>
        <span className="header-meta">Coveo · Pokémon Challenge</span>
      </div>

      <div className="search-wrap" style={{ position: 'relative' }}>
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search documentation, articles, guides…"
          autoComplete="off"
          value={searchBoxState.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />
        {searchBoxState.value && (
          <button
            className="search-clear"
            style={{ display: 'block' }}
            onClick={handleClear}
            title="Clear search"
          >
            ✕
          </button>
        )}

        {/* Suggestions dropdown */}
        {hasSuggestions && (
          <ul style={dropdownStyle}>
            {searchBoxState.suggestions.map((suggestion) => {
              const highlighted = suggestion.highlightedValue as string;
              return (
                <SuggestionItem
                key={suggestion.rawValue}
                  rawValue={suggestion.rawValue}
                  highlightedValue={highlighted}
                  defaultStyle={suggestionItemStyle}
                  hoverStyle={suggestionItemHoverStyle}
                  onSelect={handleSuggestionClick}
              />
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
};

// Extracted into its own component to avoid inline type assertion issues
interface SuggestionItemProps {
  rawValue: string;
  highlightedValue: string;
  defaultStyle: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  onSelect: (rawValue: string) => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  rawValue,
  highlightedValue,
  defaultStyle,
  hoverStyle,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseDown={() => onSelect(rawValue)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? hoverStyle : defaultStyle}
      dangerouslySetInnerHTML={{ __html: highlightedValue }}
    />
  );
};

export default SearchBox;
