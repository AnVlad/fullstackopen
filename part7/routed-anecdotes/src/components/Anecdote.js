import React from 'react';
import { useParams } from 'react-router-dom';

function Anecdote({ anecdotes }) {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  return (
    <>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </>
  );
}

export default Anecdote;
