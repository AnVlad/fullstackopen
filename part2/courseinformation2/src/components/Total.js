import React from 'react';

function Total({ parts }) {
  const sum = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return <strong>Total: {sum}</strong>;
}

export default Total;
