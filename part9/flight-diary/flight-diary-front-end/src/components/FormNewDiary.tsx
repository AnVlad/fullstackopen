import React from 'react';
import { useState } from 'react';
import { ToPostDiary, Visibility, Weather } from '../types';
import VisibilityForm from './VisibilityForm';
import WeatherForm from './WeatherForm';

const FormNewDiary = ({
  handleSubmit,
}: {
  handleSubmit: (obj: ToPostDiary) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const handleSubmitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const submittedData: ToPostDiary = { date, visibility, weather, comment };
    handleSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor='date'>date</label>
      <input
        name='date'
        type='date'
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <VisibilityForm visibility={visibility} setVisibility={setVisibility} />

      <WeatherForm weather={weather} setWeather={setWeather} />

      <label htmlFor='comment'>comment</label>
      <input
        name='comment'
        type='text'
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />

      <button type='submit'>submit</button>
    </form>
  );
};

export default FormNewDiary;
