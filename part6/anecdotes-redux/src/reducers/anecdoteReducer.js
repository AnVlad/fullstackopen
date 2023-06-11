import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

const initialState = [];

const anecdoteSlicer = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id;

      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      );
    },
    create(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, create, setAnecdotes } = anecdoteSlicer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(
      asObject(anecdote)
    );
    dispatch(create(newAnecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdotesService.voteForAnecdote(anecdote);
    dispatch(vote(changedAnecdote));
  };
};

export default anecdoteSlicer.reducer;
