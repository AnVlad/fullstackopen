import React from 'react';

function ErrorMessage({ showError, setShowError }) {
  setTimeout(() => setShowError(null), 2000);

  return <>{showError ? <div className="error">{showError}</div> : null}</>;
}

export default ErrorMessage;
