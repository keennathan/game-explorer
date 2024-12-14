import axios from 'axios';

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

/**
 * Function to get a new Twitch access token.
 * @returns {Object} - The access token and its expiry time.
 */
export const getTwitchAccessToken = async () => {
  try {
    const response = await axios.post(TWITCH_TOKEN_URL, null, {
      params: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });
    const { access_token, expires_in } = response.data;
    const tokenExpiry = Date.now() + expires_in * 1000;
    return { accessToken: access_token, tokenExpiry };
  } catch (error) {
    console.error('Error fetching Twitch access token:', error);
    throw error;
  }
};