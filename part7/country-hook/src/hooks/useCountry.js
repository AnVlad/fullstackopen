import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const theCountry = (country) => {
    return {
      data: {
        name: country.data.name.common,
        capital: country.data.capital,
        population: country.data.population,
        flag: country.data.flags.png,
      },
      found: true,
    };
  };

  const theError = (error) => {
    return {
      error: error,
      found: false,
    };
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((data) => setCountry(theCountry(data)))
      .catch((error) => setCountry(theError(error)));
  }, [name]);

  return country;
};

export default useCountry;
