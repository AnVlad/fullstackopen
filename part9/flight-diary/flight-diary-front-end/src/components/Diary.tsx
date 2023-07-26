import React from 'react';
import { DiaryType } from '../types';

interface DiaryProps {
  diary: DiaryType;
}

const Diary: React.FC<DiaryProps> = ({ diary }) => {
  return (
    <>
      <h4>{diary.date}</h4>
      <p>weather: {diary.weather}</p>
      <p>visibility: {diary.visibility}</p>
    </>
  );
};

export default Diary;
