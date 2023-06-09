import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  closeNotification,
  setNotification,
  showNotification,
} from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) =>
    state.anecdote
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`you voted ${anecdote.content}`));
    dispatch(showNotification());
    setTimeout(() => dispatch(closeNotification()), 3000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
