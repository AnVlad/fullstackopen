import React from 'react';

function Button({ className, onClickFunction, type, ...props }) {
  return (
    <button className={className} onClick={onClickFunction} type={type}>
      {props.children}
    </button>
  );
}

export default Button;
