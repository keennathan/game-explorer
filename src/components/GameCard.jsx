import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const GameCard = ({ game }) => {
    const { dispatch } = useContext(GameContext);

    const addToWatchlist = () => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: game });
    };

    return (
        <div className="card">
            <img
                src={game.cover?.url.replace('t_thumb', 't_cover_big')}
                alt={game.name}
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">Rating: {game.rating?.toFixed(1)}</p>
                <button className="btn btn-primary" onClick={addToWatchlist}>
                    Add to Watchlist
                </button>
            </div>
        </div>
    );
};

export default GameCard;
