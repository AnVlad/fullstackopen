import React, { useEffect, useState } from 'react';
import weatherAPI from '../services/weatherAPI';

function WeatherOfCountry({ country }) {
  const [lat, lon] = country.capitalInfo.latlng;
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherAPI.getWeather(lat, lon).then((response) => setWeather(response));
  }, []);
  console.log(weather);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <>
      {isEmptyObject(weather) ? null : (
        <>
          <h1>Weather in {country.capital}</h1>
          <p>temperature {weather?.main?.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind: {weather?.wind?.speed} m/s</p>
        </>
      )}
    </>
  );
}

export default WeatherOfCountry;
