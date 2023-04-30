import React, { useState } from 'react';

function FilterNumbers({ persons, setNumbers }) {
  const [newName, setNewName] = useState('');

  const handleChange = (event) => {
    setNewName(event.target.value);
    let newListOfPersons = persons.filter((name) =>
      name.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setNumbers(newListOfPersons);
  };

  return (
    <div>
      filter shown with:
      <input value={newName} onChange={handleChange} />
    </div>
  );
}

export default FilterNumbers;
