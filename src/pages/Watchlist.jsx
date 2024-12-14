import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import BackButton from '../components/BackButton';

/**
 * Component to display the user's watchlist.
 * @returns {JSX.Element} - The Watchlist component.
 */
const Watchlist = () => {
    const { state } = useContext(GameContext);

    return (
        <div className="container mt-4 ps-5">
            <BackButton />
            <h1 className="text-center mb-4">My Watchlist</h1>
            <div className="row">
                {state.watchlist.length > 0 ? (
                    state.watchlist.map((game) => (
                        <div className="col-md-4 mb-4" key={game.id}>
                            <GameCard game={game} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">Your watchlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Watchlist;