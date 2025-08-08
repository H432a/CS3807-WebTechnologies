const API_KEY = 'bdc7c6cf23fdb2cfd308a354ad631752'; 
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getWeatherData(searchInput.value);
  }
});

async function getWeatherData(city) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== 200) throw new Error(weatherData.message);

    document.getElementById('mainTemp').textContent = `${Math.round(weatherData.main.temp)}°C`;
    document.getElementById('mainLocation').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('mainTime').textContent = new Date().toLocaleString('en-US', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
    document.querySelector('.condition').textContent = weatherData.weather[0].main;
    document.getElementById('mainIcon').src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
    document.getElementById('windSpeed').textContent = weatherData.wind.speed;
    document.getElementById('visibility').textContent = `${weatherData.visibility / 1000} km`;

    const sunrise = new Date(weatherData.sys.sunrise * 1000);
    const sunset = new Date(weatherData.sys.sunset * 1000);

    document.getElementById('sunrise').textContent = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Dummy values
    document.getElementById('uvIndex').textContent = 5;
    document.getElementById('airQuality').textContent = 105;

  } catch (error) {
    alert('Error: ' + error.message);
  }
}

getWeatherData('New York');
