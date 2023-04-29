import { useState } from 'react';
import Numbers from './Numbers';
import FilterNumbers from './FilterNumbers';
import AddNewNumber from './AddNewNumber';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [filteredNumbers, setFilteredNumbers] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNumbers persons={persons} setNumbers={setFilteredNumbers} />

      <h2>Add a new number</h2>
      <AddNewNumber persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Numbers persons={filteredNumbers} />
    </div>
  );
};

export default App;
