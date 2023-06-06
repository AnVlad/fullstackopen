const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Premature optimization is the root of all evil.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE": {
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return [
        ...state.map((anecdote) =>
          anecdote.id === action.payload.id ? changedAnecdote : anecdote
        ),
      ];
    }

    case "CREATE": {
      const newAnecdote = asObject(action.payload.content);

      return [...state, newAnecdote];
    }

    default:
      console.log("default", action);
      break;
  }

  return state;
};

export const vote = (id) => {
  return {
    type: "VOTE",
    payload: {
      id,
    },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "CREATE",
    payload: { content },
  };
};

export default reducer;
