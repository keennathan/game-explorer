import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/BackButton';

const API_URL = 'https://cors-proxy-server-5175830025d3.herokuapp.com/https://api.igdb.com/v4/games';

/**
 * Component to display detailed information about a game.
 * @returns {JSX.Element} - The GameDetail component.
 */
const GameDetail = () => {
    const { id } = useParams();
    const { state } = useContext(GameContext);
    const { accessToken, tokenExpiry } = state;
    const [game, setGame] = useState(null);

    useEffect(() => {
        /**
         * Fetches detailed information about the game from the IGDB API.
         */
        const fetchGameDetails = async () => {
            if (!accessToken || Date.now() >= tokenExpiry) {
                // Handle token expiry or absence
                return;
            }

            try {
                const response = await axios.post(API_URL, `fields name, genres.name, summary, storyline, screenshots.url, videos.video_id; where id = ${id};`, {
                    headers: {
                        'Client-ID': import.meta.env.VITE_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`,
                        'x-requested-with': 'XMLHttpRequest'
                    }
                });
                setGame(response.data[0]);
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };

        fetchGameDetails();
    }, [id, accessToken, tokenExpiry]);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <BackButton />
            <h1 className="text-center mb-4">{game.name}</h1>
            <h3>Genre: {game.genres.map(genre => genre.name).join(', ')}</h3>
            <p><strong>Description:</strong> {game.summary}</p>
            <p><strong>Storyline:</strong> {game.storyline}</p>
            <div className="screenshots">
                {game.screenshots.map(screenshot => (
                    <img key={screenshot.url} src={screenshot.url} alt="Screenshot" className="img-fluid mb-2" />
                ))}
            </div>
            <div className="videos">
                {game.videos.map(video => (
                    <iframe
                        key={video.video_id}
                        src={`https://www.youtube.com/embed/${video.video_id}`}
                        title="Video"
                        className="w-100 mb-2"
                        height="400"
                    ></iframe>
                ))}
            </div>
        </div>
    );
};

export default GameDetail;