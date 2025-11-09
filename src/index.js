import dotenv from 'dotenv';
import { getWeatherByCity } from './weather.js';

// Load environment variables
dotenv.config();

async function main() {
    try {
        // Get city name from command line arguments
        const city = process.argv[2];
        
        if (!city) {
            console.error('Please provide a city name. Example: npm start "London"');
            process.exit(1);
        }

        // Get weather data
        const weatherData = await getWeatherByCity(city);
        
        // Display weather information
        console.log(`Weather in ${city}: ${weatherData.temp}°C, ${weatherData.description}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();