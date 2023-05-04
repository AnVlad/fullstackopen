import React from 'react';
import personsAPI from './services/personsAPI';

function Numbers({ filteredNumbers, persons, setPersons, setShowNotification, setShowError }) {
  const deleteNumber = (name) => {
    let confirmation = window.confirm('delete?');

    if (confirmation) {
      personsAPI
        .deleteNumber(name.id)
        .then(() => {
          setShowNotification(`${name.name} has been deleted`);
        })
        .catch((error) => setShowError(`${name.name} has already been deleted`));

      setPersons(persons.filter((number) => number.id !== name.id));
    }
  };

  return (
    <>
      {filteredNumbers.map((name) => (
        <li key={name.id}>
          {name.name} {name.number}
          <span> </span>
          <button onClick={() => deleteNumber(name)}>delete</button>
        </li>
      ))}
    </>
  );
}

export default Numbers;
