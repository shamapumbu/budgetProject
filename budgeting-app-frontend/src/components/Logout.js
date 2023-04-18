import React, { useEffect } from 'react';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <div>
      <h2>You have been logged out.</h2>
    </div>
  );
};

export default Logout;
