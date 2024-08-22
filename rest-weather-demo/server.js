const express = require('express');  // Request: Setting up the Express framework
const axios = require('axios');  // Request: Importing Axios for making HTTP requests

const app = express();  // Request: Creating an instance of the Express app
const port = 3001;  // Request: Defining the port for the server

// OpenWeatherMap API configuration
const API_KEY = '4a0abbc8b904c7ecd6a197e54823c7c2'; // Request: API key for OpenWeatherMap
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'; // Request: URL of the OpenWeatherMap API

// Define a route to fetch weather data
app.get('/api/weather', async (req, res) => {  // Request: Defining a GET route for the weather API
  try {
    // Get the city from query parameters
    const city = req.query.city;  // Request: Extracting the 'city' parameter from the query string
    if (!city) {  // Request: Checking if the 'city' parameter is provided
      return res.status(400).send('City is required');  // Response: Sending a 400 Bad Request if 'city' is missing
    }

    // Fetch data from OpenWeatherMap API
    const response = await axios.get(WEATHER_API_URL, {  // Request: Making an HTTP GET request to the OpenWeatherMap API
      params: {  
        q: city,  // Request: City name parameter
        appid: API_KEY,  // Request: API key parameter
        units: 'metric'  // Request: Specifying the temperature unit as Celsius
      }
    });

    // Send the data as a response
    res.json(response.data);  // Response: Sending the weather data as a JSON response
  } catch (error) {
    // Handle errors
    res.status(500).send('Error fetching weather data');  // Response: Sending a 500 Internal Server Error if the API call fails
  }
});

// Start the server
app.listen(port, () => {  // Request: Starting the server and listening on the specified port
  console.log(`Server running at http://localhost:${port}`);  // Request: Logging the server URL to the console
});
