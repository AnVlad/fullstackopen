import React from 'react';

function LogoutForm({ user, setUser }) {
  const clickHandle = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <>
      {`${user} is logged in`}
      <div>
        <button onClick={clickHandle}>Log out</button>
      </div>
    </>
  );
}

export default LogoutForm;
