import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';


interface SearchContextType {
  activeSearchTerm: string;
  setActiveSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ activeSearchTerm, setActiveSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}