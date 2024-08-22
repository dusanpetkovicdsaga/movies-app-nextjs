

'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
        className="border rounded px-4 py-2 w-full mb-5 "
      />
      <button
        type="submit"
        className=" bg-blue-700 text-white rounded px-10 py-2 h-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
