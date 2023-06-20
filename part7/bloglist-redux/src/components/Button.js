import React from 'react';

function Button({ className, onClickfunction, type, ...props }) {
  return (
    <button className={className} onClick={onClickfunction} type={type}>
      {props.children}
    </button>
  );
}

export default Button;
