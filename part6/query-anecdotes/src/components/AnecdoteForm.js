import { useMutation, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdoteService";
import { useContext } from "react";
import NotificationContext from "../NotificationsContext";

const AnecdoteForm = () => {
  const [anecdote, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(anecdoteService.createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
      dispatch({
        type: "SHOW",
        content: `${newAnecdote.content} has been created`,
      });
      setTimeout(() => dispatch({ type: "HIDE" }), 5000);
    },
    onError: (error) => {
      dispatch({ type: "SHOW", content: `${error.message}` });
      setTimeout(() => dispatch({ type: "HIDE" }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = {
      content: content,
      votes: 0,
    };

    newAnecdoteMutation.mutate(newAnecdote);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
