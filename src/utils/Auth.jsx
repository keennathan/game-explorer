import axios from "axios";

export const getTwitchAccessToken = async () => {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }
        });
        const { access_token, expires_in, token_type } = response.data;
        return {
            accessToken: access_token,
            tokenExpiry: Date.now() + expires_in * 1000
        };
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw error;
    }
};