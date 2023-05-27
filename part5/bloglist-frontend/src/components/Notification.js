import React from 'react';

function Notification({ notification, setNotification }) {
  if (notification) {
    setTimeout(() => setNotification(null), 2000);
  }

  return <>{notification ? <div className="notification">{notification}</div> : null}</>;
}

export default Notification;
