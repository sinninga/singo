import React, { useState } from 'react';
import '../styles/search.css';



const Search = ({ onSearch, onSelectTrack, accessToken, searchResults }) => {
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
    const searchResults = await fetchSearchResults(searchQuery, 1); 
    console.log('Search results:', searchResults); 
    onSearch(searchResults);
  };

  return (
    <>
    <div className="search-component-container">
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
      {searchResults.length > 0 && (
        <div className="search-results">
          <div>
            {searchResults.map((track) => (
              <div key={track.id} className='song'>
                <img src={track.album.images[0].url}  className="album-art" alt="" />
                <h4 className='track-info'>{track.name} - {track.artists[0].name}</h4>
                <button className="song-btn" onClick={() => onSelectTrack(track.uri)}>PLAY</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Search;