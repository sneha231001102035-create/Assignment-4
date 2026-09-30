function WeatherCard({ weather }) {
  const sunrise = new Date(
    weather.sys.sunrise * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(
    weather.sys.sunset * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">

      <div className="location">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>

        <p>
          {weather.weather[0].description}
        </p>
      </div>

      <div className="weather-main">

        <img
          src={weatherIcon}
          alt={weather.weather[0].description}
          className="weather-icon"
        />

        <div className="temperature">
          {Math.round(weather.main.temp)}
          <span>°C</span>
        </div>

      </div>

      <div className="weather-details">

        <div className="weather-item">
          <span className="icon">🌡️</span>

          <div>
            <h3>Feels Like</h3>

            <p>
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="weather-item">
          <span className="icon">💧</span>

          <div>
            <h3>Humidity</h3>

            <p>{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="weather-item">
          <span className="icon">💨</span>

          <div>
            <h3>Wind Speed</h3>

            <p>
              {weather.wind.speed} m/s
            </p>
          </div>
        </div>

        <div className="weather-item">
          <span className="icon">🌅</span>

          <div>
            <h3>Sunrise</h3>

            <p>{sunrise}</p>
          </div>
        </div>

        <div className="weather-item">
          <span className="icon">🌇</span>

          <div>
            <h3>Sunset</h3>

            <p>{sunset}</p>
          </div>
        </div>

        <div className="weather-item">
          <span className="icon">🔽</span>

          <div>
            <h3>Pressure</h3>

            <p>
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;
