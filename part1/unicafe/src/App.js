import { useState } from 'react';
import Statistics from './Statistics';
import Button from './Button';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button action={() => setGood(good + 1)} name={'good'} />
        <Button action={() => setNeutral(neutral + 1)} name={'neutral'} />
        <Button action={() => setBad(bad + 1)} name={'bad'} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
