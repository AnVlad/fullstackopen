import React from 'react';

function LogoutForm({ user, setUser }) {
  const clickHandle = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedUser');
    setUser({});
  };

  return (
    <>
      {`${user.user} is logged in`}
      <div>
        <button id='logOut' onClick={clickHandle}>
          Log out
        </button>
      </div>
    </>
  );
}

export default LogoutForm;
