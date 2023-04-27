import React from 'react';

function Content(props) {
  return (
    <>
      {props.parts.map((item) => (
        <p key={item.id}>
          {item.name} {item.exercises}
        </p>
      ))}
    </>
  );
}

export default Content;
