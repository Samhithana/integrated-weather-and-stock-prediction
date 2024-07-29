const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]; // Add more cities as needed

document.getElementById('search-btn').addEventListener('click', search);

function populateDatalist() {
  const datalist = document.getElementById('cities');
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    datalist.appendChild(option);
  });
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerHTML = message;
  errorMessage.style.display = 'block';
}

function clearError() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerHTML = '';
  errorMessage.style.display = 'none';
}

function search() {
  const city = document.getElementById('city-input').value;
  const apiKey = 'd9af1c5926b7c963c7bec08d9c07c80e'; // Replace with your OpenWeatherMap API key

  if (!city) {
    showError("Please enter a city");
    return;
  }

  clearError();

  // Fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;

      // Change background based on weather
      changeBackground(data.weather[0].main);
    })
    .catch(error => {
      showError('Error: ' + error.message);
    });

  // Fetch 5-day weather forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const forecastInfo = document.getElementById('forecast-info');
      forecastInfo.innerHTML = '<h3>5-Day Forecast</h3>';

      for (let i = 0; i < data.list.length; i += 8) {
        const forecastDay = data.list[i];
        forecastInfo.innerHTML += `
          <div class="forecast-day">
            <h4>${new Date(forecastDay.dt * 1000).toLocaleDateString()}</h4>
            <p>Temp: ${forecastDay.main.temp}°C</p>
            <p>${forecastDay.weather[0].description}</p>
          </div>
        `;
      }
    })
    .catch(error => {
      showError('Error: ' + error.message);
    });
}

function changeBackground(weather) {
  const body = document.body;
  switch(weather.toLowerCase()) {
    case 'clear':
      body.style.backgroundImage = "url('clear.jpg')";
      break;
    case 'clouds':
      body.style.backgroundImage = "url('cloudy.jpg')";
      break;
    case 'rain':
      body.style.backgroundImage = "url('rain.jpg')";
      break;
    case 'snow':
      body.style.backgroundImage = "url('snow.jpg')";
      break;
    default:
      body.style.backgroundImage = "url('default.jpg')";
      break;
  }
}

// Populate the datalist on page load
window.onload = populateDatalist;

