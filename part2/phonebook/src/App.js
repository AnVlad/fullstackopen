import { useEffect, useState } from 'react';
import Numbers from './Numbers';
import FilterNumbers from './FilterNumbers';
import AddNewNumber from './AddNewNumber';
import personsAPI from './services/personsAPI';
import Notification from './Notification';
import ErrorMessage from './ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredNumbers, setFilteredNumbers] = useState([...persons]);

  const [showNotification, setShowNotification] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    personsAPI
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((error) => setShowError(error.message));
  }, []);

  useEffect(() => {
    setFilteredNumbers(persons);
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification showNotification={showNotification} setShowNotification={setShowNotification} />
      <ErrorMessage showError={showError} setShowError={setShowError} />

      <FilterNumbers persons={persons} setNumbers={setFilteredNumbers} />

      <h2>Add a new number</h2>
      <AddNewNumber
        persons={persons}
        setPersons={setPersons}
        setShowNotification={setShowNotification}
      />

      <h2>Numbers</h2>
      <Numbers
        filteredNumbers={filteredNumbers}
        persons={persons}
        setPersons={setPersons}
        setShowNotification={setShowNotification}
        setShowError={setShowError}
      />
    </div>
  );
};

export default App;
