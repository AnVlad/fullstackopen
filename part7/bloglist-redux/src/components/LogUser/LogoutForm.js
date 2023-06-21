import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../reduces/userReducer';

function LogoutForm() {
  const user = useSelector((data) => data.user);
  const dispatch = useDispatch();

  const clickHandle = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedUser');
    dispatch(logOutUser());
  };

  return (
    <>
      {`${user.user} is logged in`}{' '}
      <>
        <button id='logOut' onClick={clickHandle}>
          Log out
        </button>
      </>
    </>
  );
}

export default LogoutForm;
