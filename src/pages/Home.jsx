import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const Home = () => {
    const { state, dispatch } = useContext(GameContext);
    const [accessToken, setAccessToken] = useState('');

    const getTwitchAccessToken = async () => {
        try {
            const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
                params: {
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    client_secret: import.meta.env.VITE_CLIENT_SECRET,
                    grant_type: 'client_credentials'
                }
            });
            const { access_token, expires_in, token_type } = response.data;
            console.log(`Access Token: ${access_token}`);
            console.log(`Expires In: ${expires_in} seconds`);
            console.log(`Token Type: ${token_type}`);
            setAccessToken(access_token);
        } catch (error) {
            console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        }
    };

    const fetchGames = async () => {
        try {
            console.log('Fetching games...');
            const response = await axios.post(
                'http://localhost:8080/https://api.igdb.com/v4/games',
                `
                fields name, rating, cover.url, platforms.name;
                sort popularity desc;
                limit 10;
                `,
                {
                    headers: {
                        'Client-ID': import.meta.env.VITE_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Games fetched:', response.data);
            dispatch({ type: 'SET_GAMES', payload: response.data });
        } catch (error) {
            console.error('Error fetching games:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getTwitchAccessToken();
            await fetchGames();
        };
        fetchData();
    }, [accessToken]);

    return (
        <div>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Trending Games</h1>
                <div className="row">
                    {state.games.map((game) => (
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