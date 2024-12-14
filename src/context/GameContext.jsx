import React, { createContext, useReducer } from 'react';

// Initial state for the GameContext
const initialState = {
  games: [],
  searchResults: [],
  watchlist: [],
  accessToken: null,
  tokenExpiry: null,
};

// Reducer function to manage state updates
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'ADD_GAMES':
      return { ...state, games: [...state.games, ...action.payload] };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'ADD_TO_WATCHLIST':
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_FROM_WATCHLIST':
      return { ...state, watchlist: state.watchlist.filter(game => game.id !== action.payload) };
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.payload };
    case 'SET_TOKEN_EXPIRY':
      return { ...state, tokenExpiry: action.payload };
    default:
      return state;
  }
};

// Create the GameContext
export const GameContext = createContext();

/**
 * Provider component to wrap the application and provide the GameContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} - The GameProvider component.
 */
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};