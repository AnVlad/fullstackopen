import React from 'react';

function Button({ action, name }) {
  return <button onClick={action}>{name}</button>;
}

export default Button;
