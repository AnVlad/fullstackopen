import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notification);
  return (
    <>
      {notification.showNotification ? (
        <div className='notification'>{notification.notification}</div>
      ) : null}
    </>
  );
}

export default Notification;
