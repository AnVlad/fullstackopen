import { useEffect, useState } from 'react';
import './App.css';
import { DiaryType, NewDiary, ToPostDiary } from './types';
import DairiesList from './components/DiariesList';
import diaryService from './services/diaryService';
import FormNewDiary from './components/FormNewDiary';

function App() {
  const unknownErrorMessage = 'something went wrong';

  const [diaries, setDiaries] = useState<DiaryType[]>([]);
  const [error, setError] = useState('');

  console.log(diaries);

  useEffect(() => {
    const gettingDiaries = async () => {
      const res = await diaryService.getDiaries();
      if (res === undefined) {
        setError(unknownErrorMessage);
      } else {
        setDiaries(res);
      }
    };

    gettingDiaries();
  }, []);

  const handleSubmit = async (obj: ToPostDiary) => {
    try {
      const newDiary: NewDiary = { ...obj, id: diaries.length };
      const res = await diaryService.addDiary(newDiary);

      if (res === undefined) {
        setError(unknownErrorMessage);
      } else {
        setDiaries([...diaries, res]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(unknownErrorMessage);
      }
    }
  };

  return (
    <div className='App'>
      {error ? <div>{error}</div> : null}
      <FormNewDiary handleSubmit={handleSubmit} />
      <DairiesList diaries={diaries} />
    </div>
  );
}

export default App;
