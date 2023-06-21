import React from 'react';

function ErrorMessage({ error, setError }) {
  setTimeout(() => setError(null), 2000);

  return <>{error ? <div className='error'>{error}</div> : null}</>;
}

export default ErrorMessage;
