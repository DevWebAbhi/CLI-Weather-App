import axios from 'axios';

// OpenWeatherMap API base URL
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherByCity(city) {
    try {
        // Get API key from environment variables
        const apiKey = process.env.OPENWEATHER_API_KEY;
        
        if (!apiKey) {
            throw new Error('OpenWeatherMap API key is not configured. Please set OPENWEATHER_API_KEY in your .env file.');
        }

        // Make API request
        const response = await axios.get(API_BASE_URL, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // Get temperature in Celsius
            }
        });

        // Extract relevant data
        const { main, weather } = response.data;
        
        return {
            temp: Math.round(main.temp), // Round temperature to nearest degree
            description: weather[0].description
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the city name and try again.`);
            }
            throw new Error(`API Error: ${error.response.data.message}`);
        }
        throw error;
    }
}