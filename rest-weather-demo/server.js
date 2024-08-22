const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// OpenWeatherMap API configuration
const API_KEY = '4a0abbc8b904c7ecd6a197e54823c7c2'; // Replace with your API key
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Define a route to fetch weather data
app.get('/api/weather', async (req, res) => {
  try {
    // Get the city from query parameters
    const city = req.query.city;
    if (!city) {
      return res.status(400).send('City is required');
    }

    // Fetch data from OpenWeatherMap API
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Temperature in Celsius
      }
    });

    // Send the data as a response
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).send('Error fetching weather data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
