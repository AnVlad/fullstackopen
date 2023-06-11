import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const voteForAnecdote = async (anecdote) => {
  const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  const id = anecdote.id;
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return response.data;
};

const anecdotesService = { getAll, createAnecdote, voteForAnecdote };

export default anecdotesService;
