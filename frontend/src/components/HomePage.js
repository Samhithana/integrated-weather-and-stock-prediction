
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = (city) => {
    fetch(`/weather?city=${city}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default HomePage;
