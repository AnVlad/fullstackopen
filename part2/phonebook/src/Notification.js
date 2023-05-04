import React from 'react';

function Notification({ showNotification, setShowNotification }) {
  if (showNotification) {
    setTimeout(() => setShowNotification(null), 2000);
  }

  return <>{showNotification ? <div className="notification">{showNotification}</div> : null}</>;
}

export default Notification;
