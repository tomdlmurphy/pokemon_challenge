import {createContext, useContext} from 'react';
import {SearchEngine} from '@coveo/headless';

export const EngineContext = createContext<SearchEngine | null>(null);
export const EngineProvider = EngineContext.Provider;

export const useEngine = (): SearchEngine => {
  const engine = useContext(EngineContext);
  if (!engine) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return engine;
};
