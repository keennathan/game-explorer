import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { getTwitchAccessToken } from "../utils/Auth";

/**
 * Component to display the home page with a list of most rated games.
 * @returns {JSX.Element} - The Home component.
 */
const Home = () => {
    const { state, dispatch } = useContext(GameContext);
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [page, setPage] = useState(0);
    const loader = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetches games from the IGDB API based on the current page.
     * @param {number} page - The current page number.
     */
    const fetchGames = async (page = 0) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        const offset = page * 6; // Calculate offset based on current page

        try {
            const response = await axios.post(
                'https://cors-proxy-server-5175830025d3.herokuapp.com/https://api.igdb.com/v4/games',
                `
                fields name, cover.url, platforms.name, total_rating, total_rating_count;
                where platforms = (6, 48, 49, 167, 169) & total_rating_count != null;
                sort total_rating_count desc;
                limit 6;
                offset ${offset};
                `,
                {
                    headers: {
                        'Client-ID': import.meta.env.VITE_CLIENT_ID,
                        'Authorization': `Bearer ${state.accessToken}`,
                        'x-requested-with': 'XMLHttpRequest'
                    },
                }
            );

            const newGames = response.data;

            if (newGames.length > 0) {
                dispatch({ type: page === 0 ? 'SET_GAMES' : 'ADD_GAMES', payload: newGames });
            } else {
                console.log("No more games to fetch.");
            }
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!state.accessToken || Date.now() >= state.tokenExpiry) {
                const { accessToken, tokenExpiry } = await getTwitchAccessToken();
                dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
                dispatch({ type: 'SET_TOKEN_EXPIRY', payload: tokenExpiry - 30000 }); // Subtract 30 seconds buffer
            }
            await fetchGames(page);
        };

        fetchData();
    }, [state.accessToken, state.tokenExpiry, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loader.current) observer.observe(loader.current);

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [isLoading]);

    /**
     * Filters games by the selected platform.
     * @param {string} platform - The selected platform.
     * @returns {Array} - The filtered list of games.
     */
    const filterGamesByPlatform = (platform) => {
        if (platform === 'all') return state.games;
        return state.games.filter((game) =>
            game.platforms.some((p) => p.name.toLowerCase().includes(platform.toLowerCase()))
        );
    };

    return (
        <div className="ps-4 mt-5 d-flex flex-column align-items-center vh-100">
            <div className="container text-center mt-5">
                <h1 className="mb-3">Most Rated Games</h1>
                <select
                    value={selectedPlatform}
                    onChange={(e) => {
                        setSelectedPlatform(e.target.value);
                        setPage(0); // Reset to page 0 on platform change
                        dispatch({ type: 'SET_GAMES', payload: [] }); // Clear games
                    }}
                    className="form-select mb-4"
                >
                    <option value="all">All Platforms</option>
                    <option value="pc">PC</option>
                    <option value="ps5">PS5</option>
                    <option value="xbox">Xbox</option>
                </select>

                <div className="row">
                    {filterGamesByPlatform(selectedPlatform).map((game) => (
                        <div className="col-md-4 mb-4" key={game.id}>
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
                {isLoading && <div className="loader">Loading more games...</div>}
                {error && (
                    <div className="error text-danger">
                        {typeof error === 'object' ? error.message || JSON.stringify(error) : error}
                    </div>
                )}
                <div ref={loader} className="loader"></div>
            </div>
        </div>
    );
};

export default Home;