import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';

import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations';

const App = () => {
  const [token, setToken] = useState(null); // eslint-disable-line

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <div>
        <Link to={'/'}>authors</Link> <Link to={'/books'}>books</Link>{' '}
        <Link to={'/add'}>add book</Link>{' '}
        <Link to={'/recommendations'}>recommendations</Link>{' '}
        {token ? (
          <button type='button' onClick={logout}>
            logout
          </button>
        ) : (
          <Link to={'/login'}>login</Link>
        )}
      </div>
      <div> </div>
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
