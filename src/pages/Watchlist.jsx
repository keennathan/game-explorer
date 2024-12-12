import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import BackButton from "../components/BackButton";  

const Watchlist = () => {
    const { state } = useContext(GameContext);

    return (
        <div className="container mt-4 ps-5">
            <BackButton />
            <h1 className="text-center mb-4">Your Watchlist</h1>
            <div className="row">
                {state.watchlist.map((game) => (
                    <div className="col-md-4 mb-4" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watchlist;