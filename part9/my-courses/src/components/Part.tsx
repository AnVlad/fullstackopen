import React from 'react';
import { CourseParts } from '../courseParts';

interface CoursePartsProps {
  coursePart: CourseParts;
}

const Part: React.FC<CoursePartsProps> = ({ coursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
        </>
      );

    case 'background':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
          <p> submit to {coursePart.backgroundMaterial}</p>
        </>
      );

    case 'group':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p> project exercises {coursePart.groupProjectCount} </p>
        </>
      );

    case 'special':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
          <p>required skills: {coursePart.requirements.join(', ')}</p>
        </>
      );

    default:
      throw new Error(`it is not typed course part`);
  }
};

export default Part;
