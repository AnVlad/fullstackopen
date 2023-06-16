import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import ErrorMessage from './components/ErrorMessage';
import Notification from './components/Notification';
import LoggedField from './components/LoggedField';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  console.log('blogs', blogs);

  const [user, setUser] = useState({});
  console.log('user', user);

  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      const response = await blogService.getAll();

      setBlogs(response);
    }
    fetchedData();

    setUpdateList(!updateList);
  }, []);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    console.log(loggedUser);

    if (loggedUser) {
      setUser({
        user: loggedUser.name,
        username: loggedUser.username,
        id: loggedUser.userid,
      });
      blogService.setToken(loggedUser.token);
    }
  }, [updateList]);

  const handleUpdateLikes = async (blog) => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,

      // because user stored in database as id and modified by mongoose by "populate" method
      user: blog.user.id,
    };

    const newUpdatedBlog = await blogService.updateBlog(updatedBlog, blog.id);

    const newListOfBlogs = blogs.map((blog) =>
      blog.id === newUpdatedBlog.id ? newUpdatedBlog : blog
    );
    setBlogs(newListOfBlogs);
  };

  const handleDeleting = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return;

    await blogService.deleteBlog(blog.id);

    const newListOfBlogs = blogs.filter((blogFromList) => {
      return blogFromList.id !== blog.id;
    });
    setBlogs(newListOfBlogs);
  };

  return (
    <div>
      {!user.user ? (
        <LoginForm setUpdateList={setUpdateList} setError={setError} />
      ) : (
        <LoggedField
          setNotification={setNotification}
          setError={setError}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
          setUser={setUser}
        />
      )}

      {error && <ErrorMessage error={error} setError={setError} />}
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      <h2>blogs</h2>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            user={user.user}
            userId={user.id}
            key={blog.id}
            blog={blog}
            handleUpdateLikes={handleUpdateLikes}
            handleDeleting={handleDeleting}
          />
        ))}
    </div>
  );
};

export default App;
