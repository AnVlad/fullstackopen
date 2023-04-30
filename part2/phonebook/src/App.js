import { useEffect, useState } from 'react';
import Numbers from './Numbers';
import FilterNumbers from './FilterNumbers';
import AddNewNumber from './AddNewNumber';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredNumbers, setFilteredNumbers] = useState([...persons]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => setPersons(response.data));
  }, []);

  useEffect(() => {
    setFilteredNumbers(persons);
  }, [persons]);

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
