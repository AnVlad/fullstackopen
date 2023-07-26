import React from 'react';
import { Weather } from '../types';

interface VisibilityProps {
  weather: Weather;
  setWeather: (value: Weather) => void;
}

const WeatherForm: React.FC<VisibilityProps> = ({ weather, setWeather }) => {
  const weatherList = Object.values(Weather).map((value) => value.toString());

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedElement = event.target.value as Weather;
    setWeather(selectedElement);
  };
  return (
    <div>
      <p>weather: </p>
      {weatherList.map((element) => {
        return (
          <div key={element}>
            <input
              type='radio'
              name='weather'
              checked={weather === element}
              value={element}
              id={element}
              onChange={handleRadioChange}
            />
            <label htmlFor='weather'>{element}</label>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherForm;
