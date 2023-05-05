import React from 'react';
import { useState, useEffect } from 'react';

function FilterCountries({ countries, setFilteredListOfCountries, findCountry }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setFilteredListOfCountries(
      countries.filter((country) => country.name.common.toLowerCase().includes(name.toLowerCase())),
    );
  }, [name, countries]);

  useEffect(() => {
    setName(findCountry);
  }, [findCountry]);

  return (
    <>
      <div>
        find countries:
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}></input>
      </div>
    </>
  );
}

export default FilterCountries;
