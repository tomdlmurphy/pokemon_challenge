import React, {useEffect, useState, KeyboardEvent} from 'react';
import {buildSearchBox} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

const SearchBox: React.FC = () => {
  const engine = useEngine();

  // Build the controller once
  const [controller] = useState(() => buildSearchBox(engine));

  // Local copy of controller state
  const [searchBoxState, setSearchBoxState] = useState(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setSearchBoxState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

  // Update text in Coveo as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controller.updateText(e.target.value);
  };

  // Submit on Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      controller.submit();
    }
  };

  // Clear the input
  const handleClear = () => {
    controller.clear();
  };

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
          value={searchBoxState.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {searchBoxState.value && (
          <button
            className="search-clear"
            style={{display: 'block'}}
            onClick={handleClear}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
};

export default SearchBox;
