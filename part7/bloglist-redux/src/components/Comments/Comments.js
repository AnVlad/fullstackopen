import React from 'react';
import style from './Comments.module.css';

function Comments({ comments }) {
  return (
    <div className={style.comments}>
      <h3> Comments: </h3>
      {comments.map((comment) => {
        return (
          <li className={style.comment} key={comment.id}>
            {comment.content}
          </li>
        );
      })}
    </div>
  );
}

export default Comments;
