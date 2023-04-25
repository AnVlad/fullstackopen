import React from 'react';

function Content(props) {
  return (
    <>
      {props.parts.map((item, id) => (
        <p key={id}>
          {item.name} {item.exercises}
        </p>
      ))}
    </>
  );
}

export default Content;
