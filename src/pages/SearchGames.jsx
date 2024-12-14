import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { getTwitchAccessToken } from '../utils/Auth';
import BackButton from '../components/BackButton';

const API_URL = 'https://cors-proxy-server-5175830025d3.herokuapp.com/https://api.igdb.com/v4/games';

/**
 * Function to search games from the IGDB API.
 * @param {string} query - The search query.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Array} - The list of games matching the search query.
 */
const searchGames = async (query, accessToken) => {
  try {
    const response = await axios.post(API_URL, `search "${query}"; fields name, cover.url, genres.name, platforms.name;`, {
      headers: {
        'Client-ID': import.meta.env.VITE_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
        'x-requested-with': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for games:', error);
    return [];
  }
};

/**
 * Component to search and display games.
 * @returns {JSX.Element} - The SearchGames component.
 */
const SearchGames = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.accessToken || Date.now() >= state.tokenExpiry) {
        const { accessToken, tokenExpiry } = await getTwitchAccessToken();
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
        dispatch({ type: 'SET_TOKEN_EXPIRY', payload: tokenExpiry - 30000 }); // Subtract 30 seconds buffer
      }
    };

    fetchData();
  }, [state.accessToken, state.tokenExpiry]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    const accessToken = state.accessToken; // Assuming accessToken is stored in the context state
    const games = await searchGames(query, accessToken);
    if (games.length > 0) {
      // Ensure platforms is always an array
      const gamesWithPlatforms = games.map(game => ({
        ...game,
        platforms: game.platforms || []
      }));
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: gamesWithPlatforms });
    } else {
      setError('No games found.');
    }
    setIsLoading(false);
  };

  return (
    <div className="ps-4 mt-5 d-flex flex-column align-items-center vh-100">
      <div className="container text-center mt-5">
        <div className="d-flex justify-content-start">
          <BackButton />
        </div>
        <h1 className="mb-3">Search Games</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games"
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        {error && <div className="error text-danger">{error}</div>}
        <div className="row">
          {state.searchResults && state.searchResults.map((game) => (
            <div className="col-md-4 mb-4" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchGames;