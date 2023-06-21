import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './AppBar.module.css';
import LoginForm from '../components/LogUser/LoginForm';
import LogoutForm from '../components/LogUser/LogoutForm';

function AppBar({ setUpdateList, setError }) {
  const user = useSelector((data) => data.user);

  return (
    <div className={style['appBar-container']}>
      <div>
        <Link className={style['button']} to={'/'}>
          {' '}
          blogs{' '}
        </Link>
        <Link className={style['button']} to={'/users'}>
          {' '}
          users{' '}
        </Link>{' '}
      </div>
      <div>
        {!user.user ? (
          <LoginForm setUpdateList={setUpdateList} setError={setError} />
        ) : (
          <LogoutForm />
        )}
      </div>
    </div>
  );
}

export default AppBar;
