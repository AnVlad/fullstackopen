import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createAnecdote = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then((response) => response.data);
};

const changeAnecdote = (changedAnecdote) => {
  return axios
    .put(`${baseUrl}/${changedAnecdote.id}`, changedAnecdote)
    .then((response) => response.data);
};

const anecdoteService = {
  getAnecdotes,
  createAnecdote,
  changeAnecdote,
};

export default anecdoteService;
