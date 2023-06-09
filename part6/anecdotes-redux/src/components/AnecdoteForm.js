import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import {
  closeNotification,
  setNotification,
  showNotification,
} from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    dispatch(createNewAnecdote(content));
    event.target.anecdote.value = "";

    dispatch(setNotification(`you've created ${content}`));
    dispatch(showNotification());
    setTimeout(() => dispatch(closeNotification()), 3000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
