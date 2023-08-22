import React, { useState } from 'react';
import './search.css';


const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="form-container">
        <form onSubmit={handleSearch}>
        <div className="search-container">
        <input
            type="text"
            className='search-form'
            placeholder="Search for a song..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className='search-btn'>Search</button>
        </div>
        </form>
    </div>
  );
};

export default Search;