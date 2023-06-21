import React, { useState } from 'react';
import commentsService from '../../services/comments';

function CreateComment({ blogId, setComments }) {
  const [text, setText] = useState('');

  const newComment = () => {
    return { content: text, blogId: blogId };
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const comment = await commentsService.postComment(newComment());
    setText('');
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type='field'
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type='submit'>add comment</button>
    </form>
  );
}

export default CreateComment;
