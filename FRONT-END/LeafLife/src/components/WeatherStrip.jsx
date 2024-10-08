import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const WeatherStrip = ({ gardenId }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);   // Store latitude dynamically
  const [lon, setLon] = useState(null);   // Store longitude dynamically
  const [gardenName, setGardenName] = useState(null);

  useEffect(() => {
    // Fetch garden data including coordinates
    const fetchGardenCoordinates = async () => {
      try {
        const gardenResponse = await api.get(`/garden/${gardenId}/`); // Fetch garden details
        setLat(gardenResponse.data.lat);
        setLon(gardenResponse.data.long);
        setGardenName(gardenResponse.data.name);
      } catch (err) {
        setError('Error fetching garden coordinates');
        setLoading(false);
      }
    };

    // Fetch weather data using the lat and long
    const fetchWeather = async (lat, lon) => {
      try {
        const weatherResponse = await api.get(`/weather?lat=${lat}&lon=${lon}`);
        setWeather(weatherResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather details');
        setLoading(false);
      }
    };

    // Fetch both coordinates and weather data when gardenId is present
    if (gardenId) {
      fetchGardenCoordinates()
        .then(() => {
          if (lat && lon) {
            fetchWeather(lat, lon);
          }
        })
        .catch(() => setError('Error fetching garden and weather data'));
    }
  }, [gardenId, lat, lon]);

  // Render loading state
  if (loading) {
    return (
      <div className="bg-green-600 text-white w-full flex justify-between items-center p-8 rounded-md shadow-xl">
        <div className="flex items-center">
          <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
          <span>Loading weather...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-blue-500 text-white w-full flex justify-between items-center p-8 rounded-md shadow-md">
        <div className="p-4">{error}</div>
      </div>
    );
  }

  const temperature = weather.main.temp;
  const garden = gardenName;
  const description = weather.weather[0].description;
  const windSpeed = weather.wind.speed;
  const iconCode = weather.weather[0].icon; // Get the icon code
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL

  return (
    <div className="bg-green-700 text-white w-60%] flex flex-col justify-between items-center p-8 rounded-md shadow-md">
      <div className="text-xl font-bold">Current Weather at {garden}</div>
      <div className="flex items-center">
        <img 
          src={iconUrl} 
          alt={description} 
          className="w-20 h-16 mr-2"
        />
        <div className="text-lg">
          {temperature}°C - {description}
        </div>
      </div>
      <div className="text-md">Wind: {windSpeed} km/h</div>
    </div>
  );
};

export default WeatherStrip;