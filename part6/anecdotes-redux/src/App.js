import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdotesService from "./services/anecdotes";
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
