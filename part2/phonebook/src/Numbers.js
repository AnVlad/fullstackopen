import React from 'react';

function Numbers({ persons }) {
  return (
    <>
      {persons.map((name) => (
        <li key={name.id}>
          {name.name} {name.number}
        </li>
      ))}
    </>
  );
}

export default Numbers;
