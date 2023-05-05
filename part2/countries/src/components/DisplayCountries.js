import { useEffect, useState } from 'react';
import WeatherOfCountry from './WeatherOfCountry';

function DisplayCountries({ countries, setFindCountry }) {
  const [languages, setLanguages] = useState([]);
  const [listOfCountries, setListOfCountries] = useState([]);

  const country = countries[0];
  const name = country?.name;

  const handleClick = (countryName) => {
    setFindCountry(countryName);
  };

  useEffect(() => {
    const languages = country?.languages;
    if (languages) {
      setLanguages(Object.values(languages));
    }

    const namesOfCountries = countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common} <button onClick={() => handleClick(country.name.common)}>show</button>
      </div>
    ));
    setListOfCountries(namesOfCountries);
  }, [countries]);

  return (
    <>
      {countries.length < 10 && country !== undefined ? (
        countries.length === 1 ? (
          <>
            <h1>{name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h2>languages:</h2>
            <ul>
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={`${country.flags.png}`} />

            <WeatherOfCountry country={country} />
          </>
        ) : (
          <>
            <div>{listOfCountries}</div>
          </>
        )
      ) : (
        <div>Specify filter</div>
      )}
    </>
  );
}

export default DisplayCountries;
