import React, { useState } from 'react';

function AddNewNumber({ persons, setPersons }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const isNameExist = (givenName) => {
    let findDuplicate = persons.find(({ name }) => {
      return name === givenName;
    });

    return findDuplicate ? true : false;
  };

  const addNewName = (event) => {
    event.preventDefault();

    isNameExist(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default AddNewNumber;
