import React, { useState } from 'react';
import '../styles/search.css';



const Search = ({ onSearch, onSelectTrack, accessToken }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSearchResults = async (query, limit) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    return data.tracks.items;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResults = await fetchSearchResults(searchQuery, 1); // Implement this function
    console.log('Search results:', searchResults); // Log the search results
    onSearch(searchResults);
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
        <button type="submit" className='search-btn'>SEARCH</button>
        </div>
        </form>
    </div>
  );
};

export default Search;