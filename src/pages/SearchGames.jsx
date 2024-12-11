import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

const SearchGames = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiry, setTokenExpiry] = useState(0);

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
            setTokenExpiry(Date.now() + expires_in * 1000); // Set token expiry time
        } catch (error) {
            console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        }
    };

    const searchGames = async () => {
        try {
            if (!accessToken || Date.now() >= tokenExpiry) {
                await getTwitchAccessToken();
            }
            const response = await axios.post(
                'http://localhost:8080/https://api.igdb.com/v4/games',
                `
                search "${searchTerm}";
                fields name, rating, cover.url, platforms.name;
                limit 10;
                `,
                {
                    headers: {
                        'Client-ID': import.meta.env.VITE_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setResults(response.data);
        } catch (error) {
            console.error('Error searching games:', error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            searchGames();
        }
    }, [searchTerm]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Search Games</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for games"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={searchGames}>
                    Search
                </button>
            </div>
            <div className="row">
                {results.map((game) => (
                    <div className="col-md-4 mb-4" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchGames;