import React from 'react';
import { useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';

function CreateNew({ setNotification, ...props }) {
  const content = useField('content');
  const author = useField('content');
  const info = useField('content');

  const navigate = useNavigate();

  console.log(content);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`a new anecdote ${content.value} created`);
    setTimeout(() => setNotification(''), 2000);
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button
          type='button'
          onClick={() => {
            content.onChange.reset();
            author.onChange.reset();
            info.onChange.reset();
          }}>
          reset
        </button>
      </form>
    </div>
  );
}

export default CreateNew;
