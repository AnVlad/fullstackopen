import { useEffect, useState } from 'react';

import countriesAPI from './services/countriesAPI';
import FilterCountries from './components/FilterCountries';
import DisplayCountries from './components/DisplayCountries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredListOfCountries, setFilteredListOfCountries] = useState([]);
  const [findCountry, setFindCountry] = useState('');

  useEffect(() => {
    countriesAPI.getAll().then((response) => setCountries(response));
  }, []);

  return (
    <div className="App">
      <FilterCountries
        countries={countries}
        setFilteredListOfCountries={setFilteredListOfCountries}
        findCountry={findCountry}
      />
      <DisplayCountries countries={filteredListOfCountries} setFindCountry={setFindCountry} />
    </div>
  );
}

export default App;
