import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdoteService";
import NotificationContext from "../NotificationsContext";

function AnecdotesList({ anecdotes }) {
  const [anecdote, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(anecdoteService.changeAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [
        ...anecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        ),
      ]);

      dispatch({
        type: "SHOW",
        content: `${newAnecdote.content} has been voted`,
      });
      setTimeout(() => dispatch({ type: "HIDE" }), 2000);
    },
  });

  const handleVote = (anecdote) => {
    console.log(anecdote);
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdoteMutation.mutate(changedAnecdote);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
}

export default AnecdotesList;
