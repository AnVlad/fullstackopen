import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

function Course({ courses }) {
  return (
    <div>
      <Header course={courses.name} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  );
}

export default Course;
