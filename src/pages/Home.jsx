import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { getTwitchAccessToken } from "../utils/Auth";

const Home = () => {
    const { state, dispatch } = useContext(GameContext);
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiry, setTokenExpiry] = useState(0);
    const [selectedPlatform, setSelectedPlatform] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken || Date.now() >= tokenExpiry) {
                const { accessToken, tokenExpiry } = await getTwitchAccessToken();
                setAccessToken(accessToken);
                setTokenExpiry(tokenExpiry);
            }
            await fetchGames();
        };

        const fetchGames = async (page = 0) => {
            try {
                console.log('Fetching games...');
                const response = await axios.post(
                    'https://cors-proxy-server-5175830025d3.herokuapp.com/https://api.igdb.com/v4/games',
                    `
                    fields name, cover.url, platforms.name, total_rating, total_rating_count;
                    where platforms = (6, 48, 49, 167, 169) & total_rating_count != null;
                    sort total_rating_count desc;
                    limit 10;
                    offset ${page * 10};
                    `,
                    {
                        headers: {
                            'Client-ID': import.meta.env.VITE_CLIENT_ID,
                            'Authorization': `Bearer ${accessToken}`,
                            'x-requested-with': 'XMLHttpRequest' // Add the x-requested-with header
                        },
                    }
                );
                console.log('Games fetched:', response.data);
                dispatch({ type: 'ADD_GAMES', payload: response.data });
            } catch (error) {
                console.error('Error fetching games:', error);
                console.error('Error details:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [accessToken, tokenExpiry]);

    const filterGamesByPlatform = (platform) => {
        if (platform === 'all') {
            return state.games;
        }
        return state.games.filter(game => 
            game.platforms.some(p => p.name.toLowerCase().includes(platform.toLowerCase()))
        );
    };

    return (
        <div className="mt-5 d-flex flex-column align-items-center vh-100">
            <div className="container text-center mt-3 ps-5">
                <h1 className="mb-3">Most Rated Games</h1>
                <div className="row">
                    {filterGamesByPlatform(selectedPlatform).map((game) => (
                        <div className="col-md-4 mb-4" key={game.id}>
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;