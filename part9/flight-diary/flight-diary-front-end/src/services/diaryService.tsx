import axios from 'axios';
import { DiaryType, NewDiary } from '../types';

const baseUrl = 'http://localhost:4000/api/diaries';

const getDiaries = async () => {
  return (await axios.get<DiaryType[]>(baseUrl)).data;
};

const addDiary = async (newDiary: NewDiary) => {
  const result = (await axios.post<DiaryType>(baseUrl, newDiary)).data;
  const returnedDiary = {
    id: result.id,
    date: result.date,
    visibility: result.visibility,
    weather: result.weather,
  };
  return returnedDiary;
};

const diaryService = { getDiaries, addDiary };

export default diaryService;
