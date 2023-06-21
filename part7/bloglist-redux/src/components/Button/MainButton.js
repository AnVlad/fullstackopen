import React from 'react';
import style from './MainButton.module.css';

function MainButton({ ...props }) {
  return <button className={style['main-button']}>{props.children}</button>;
}

export default MainButton;
