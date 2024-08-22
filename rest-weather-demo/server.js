const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// OpenWeatherMap API configuration
const API_KEY = '4a0abbc8b904c7ecd6a197e54823c7c2'; // Replace with your API key
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Define a route to fetch weather data
app.get('/api/weather', async (req, res) => {  // Request: Defines the route and method (GET) for the API
  try {
    // Get the city from query parameters
    const city = req.query.city;  // Request: Retrieves the 'city' parameter from the query string

    // If city is not provided, return a 400 Bad Request error
    if (!city) {  // Request: Validates the presence of the 'city' parameter
      // Response: Sends a 400 Bad Request error if 'city' is missing
      return res.status(400).send('City is required');
    }

    // Fetch data from OpenWeatherMap API
    const response = await axios.get(WEATHER_API_URL, {  // Request: Makes an API call to OpenWeatherMap
      params: {
        q: city,  // Request: Includes the 'city' in the API call parameters
        appid: API_KEY,  // Request: Includes the API key in the API call parameters
        units: 'metric' // Request: Specifies units as metric (Celsius)
      }
    });

    // Success Response (200 OK)
    // Response: Sends the weather data as a JSON response
    res.json(response.data);

  } catch (error) {
    // Error Response (500 Internal Server Error)
    // Response: Sends a 500 Internal Server Error if something goes wrong with the API call or server
    res.status(500).send('Error fetching weather data');
  }
});

// Start the server
app.listen(port, () => {  // Request: Starts the server and listens on the specified port
  console.log(`Server running at http://localhost:${port}`);
});

/*
Request:
  - Method: GET
  - URL: http://localhost:3000/api/weather
  - Query Parameters:
    - city: Name of the city (e.g., "London")
  - Example Request: GET http://localhost:3000/api/weather?city=London

Response:
  1. Success (200 OK):
     - Content-Type: application/json
     - Example Body:
       {
         "coord": { "lon": -0.13, "lat": 51.51 },
         "weather": [
           {
             "id": 800,
             "main": "Clear",
             "description": "clear sky",
             "icon": "01d"
           }
         ],
         "main": {
           "temp": 15.5,
           "feels_like": 14.5,
           "temp_min": 14,
           "temp_max": 17,
           "pressure": 1012,
           "humidity": 72
         },
         "name": "London",
         "cod": 200
       }

  2. Error: Missing City Parameter (400 Bad Request):
     - Content-Type: text/plain
     - Example Body: "City is required"

  3. Error: API Call Failure (500 Internal Server Error):
     - Content-Type: text/plain
     - Example Body: "Error fetching weather data"
*/
