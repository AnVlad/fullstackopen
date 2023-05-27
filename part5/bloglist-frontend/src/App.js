import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import CreateNewBlogs from './components/CreateNewBlogs';
import ErrorMessage from './components/ErrorMessage';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    if (loggedUser) {
      setUser(loggedUser.name);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const AfterLogin = () => {
    return (
      <>
        <LogoutForm user={user} setUser={setUser} />
        <CreateNewBlogs setError={setError} setNotification={setNotification} />
      </>
    );
  };

  return (
    <div>
      {!user ? <LoginForm user={user} setUser={setUser} setError={setError} /> : <AfterLogin />}

      {error && <ErrorMessage error={error} setError={setError} />}
      {notification && (
        <Notification notification={notification} setNotification={setNotification} />
      )}

      <h2>blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
