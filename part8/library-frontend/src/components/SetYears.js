import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

function SetYears() {
  const [born, setBorn] = useState('');

  const [option, setOption] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const authorsList = result.data.allAuthors;

  const [editBornData] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSelect = (event) => {
    console.log('value', event.target.value);
    setOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(option, born);
    const result = await editBornData({
      variables: { name: option, setBornTo: born },
    });
    console.log(result);
    setBorn('');
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <select value={option} onChange={handleSelect}>
          {authorsList.map((author) => {
            return (
              <option key={author.id} value={author.name}>
                {' '}
                {author.name}
              </option>
            );
          })}
        </select>
        <label htmlFor='born'>born</label>
        <input
          type='text'
          name='born'
          value={born}
          onChange={(event) =>
            isNaN(Number(event.target.value))
              ? console.log('NO')
              : setBorn(Number(event.target.value))
          }
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default SetYears;
