const express = require('express');
const axios = require('axios');

const app = express();
const port = 3003;

const API_KEY = '4a0abbc8b904c7ecd6a197e54823c7c2'; // Replace with your actual API key
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).send('City is required');
    }

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
