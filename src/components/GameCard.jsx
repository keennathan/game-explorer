import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const GameCard = ({ game }) => {
    const { state, dispatch } = useContext(GameContext);

    const addToWatchlist = () => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: game });
    };

    const removeFromWatchlist = () => {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: game.id });
    };

    const isInWatchlist = state.watchlist.some(watchlistGame => watchlistGame.id === game.id);

    return (
        <div className="card h-100 bg-dark text-light">
            <img
                src={game.cover?.url.replace('t_thumb', 't_cover_big')}
                alt={game.name}
                className="card-img-top mt-3"
                style={{ height: '250px', objectFit: 'scale-down' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-platforms"><strong>Platform: </strong>
                    {game.platforms.map(platform => platform.name).join(', ')}
                </p>
                {isInWatchlist ? (
                    <button onClick={removeFromWatchlist} className="btn btn-danger mt-auto">
                        Remove from Watchlist
                    </button>
                ) : (
                    <button onClick={addToWatchlist} className="btn btn-primary mt-auto">
                        Add to Watchlist
                    </button>
                )}
                <Link to={`/game/${game.id}`} className="btn btn-secondary mt-2">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default GameCard;
