import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getTwitchAccessToken } from "../utils/Auth";
import BackButton from "../components/BackButton";

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiry, setTokenExpiry] = useState(0);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (!accessToken || Date.now() >= tokenExpiry) {
                const { accessToken, tokenExpiry } = await getTwitchAccessToken();
                setAccessToken(accessToken);
                setTokenExpiry(tokenExpiry);
            }
            try {
                const response = await axios.post(
                    `https://cors-proxy-server-5175830025d3.herokuapp.com/https://api.igdb.com/v4/games`,
                    `
                    fields name, genres.name, summary, storyline, screenshots.url, videos.video_id;
                    where id = ${id};
                    `,
                    {
                        headers: {
                            'Client-ID': import.meta.env.VITE_CLIENT_ID,
                            'Authorization': `Bearer ${accessToken}`,
                            'x-requested-with': 'XMLHttpRequest'
                        },
                    }
                );
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