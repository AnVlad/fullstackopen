import React from 'react';
import StatisticLine from './StatisticLine';

function Statistics({ good, neutral, bad }) {
  let all = good + neutral + bad;
  let average = all ? (good - bad) / all : all;
  let positive = all ? (good / all) * 100 : all;

  return (
    <>
      <h1>statistics</h1>

      {!all ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={all} />
            <StatisticLine text={'average'} value={average} />
            <StatisticLine text={'positive'} value={positive} percent={true} />
          </tbody>
        </table>
      )}
    </>
  );
}

export default Statistics;
