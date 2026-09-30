import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [city, setCity] = useState("Kolkata");
  const [searchCity, setSearchCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY) {
        setError(
          "API key is missing. Please check your .env file."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "City not found. Please enter a valid city name."
            );
          }

          if (response.status === 401) {
            throw new Error(
              "Invalid API key. Please check your OpenWeatherMap API key."
            );
          }

          throw new Error(
            "Unable to fetch weather data. Please try again."
          );
        }

        const data = await response.json();

        setWeather(data);
      } catch (err) {
        setWeather(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedCity = searchCity.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setCity(trimmedCity);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          onSearch={handleSearch}
        />

        {loading && <Loading />}

        {error && !loading && (
          <ErrorMessage message={error} />
        )}

        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}
      </main>
    </div>
  );
}

export default App;
