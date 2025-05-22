import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon className="h-6 w-6 text-text-muted" /> {/* Updated icon color */}
      </div>
      <input
        type="search" // Use type="search" for better semantics and potential browser features (like a clear button)
        placeholder="Search by name, keyword, or service..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 rounded-lg border-2 border-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors text-base shadow-sm bg-input-bg text-text-header placeholder-text-muted" // Updated text, border, bg, and placeholder colors
        aria-label="Search businesses"
      />
    </div>
  );
};