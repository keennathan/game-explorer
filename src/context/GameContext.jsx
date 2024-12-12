import React, { createContext, useReducer } from "react";

const GameContext = createContext();

const initialState = {
    games: [],
    watchlist: []
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "SET_GAMES":
            return {
                ...state,
                games: action.payload
            };
        case "ADD_GAMES":
            return {
                ...state,
                games: [...state.games, ...action.payload]
            };
        case "ADD_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload]
            };
        case "REMOVE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(game => game.id !== action.payload)
            };
        default:
            return state;
    }
};

const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext };