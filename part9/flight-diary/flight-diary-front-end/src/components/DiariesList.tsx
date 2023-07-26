import React from 'react';
import { DiaryType } from '../types';
import Diary from './Diary';

interface DiaryProps {
  diaries: DiaryType[];
}

const DairiesList: React.FC<DiaryProps> = ({ diaries }) => {
  return (
    <>
      <h1>Diary entries</h1>
      {diaries.map((diary) => {
        return <Diary key={diary.id} diary={diary} />;
      })}
    </>
  );
};

export default DairiesList;
