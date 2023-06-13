import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import anecdoteService from "./services/anecdoteService";
import AnecdotesList from "./components/AnecdotesList";

const App = () => {
  const result = useQuery("anecdotes", anecdoteService.getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log(result);
  const anecdotes = result.data;

  const RenderData = () =>
    result.status === "error" ? (
      <div>anecdote service not available due to problems in server</div>
    ) : (
      <AnecdotesList anecdotes={anecdotes} />
    );

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.isLoading ? <div>loading ...</div> : <RenderData />}
    </div>
  );
};

export default App;
