import React, { useState } from 'react';
import personsAPI from './services/personsAPI';

function AddNewNumber({ persons, setPersons, setShowNotification }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNotification = (name, action) => {
    setShowNotification(`${name} has been ${action}`);
  };

  const isNameExist = () => {
    return !!persons.find(({ name }) => name === newName);
  };

  const changeTheNumber = () => {
    let confirm = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`,
    );

    if (confirm) {
      let id = persons.find(({ name }) => name === newName).id;

      const newObject = { name: newName, number: newNumber };

      personsAPI
        .changeNumber(id, newObject)
        .then((response) =>
          setPersons([...persons.filter((person) => person.id !== id), response.data]),
        );
      handleNotification(newName, 'changed');
    }
  };

  const handleAddPNumber = () => {
    const newObject = { name: newName, number: newNumber };

    personsAPI.createNumber(newObject).then((response) => setPersons([...persons, response.data]));
    handleNotification(newName, 'added');
  };

  const addNewName = (event) => {
    event.preventDefault();

    isNameExist() ? changeTheNumber() : handleAddPNumber();
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
