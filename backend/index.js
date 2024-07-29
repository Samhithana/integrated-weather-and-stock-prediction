
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.get('/forecast', async (req, res) => {
  const city = req.query.city;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forecast data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
