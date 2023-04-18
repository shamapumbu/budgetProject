import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Budgeting App</h1>
      <p>
        Please <Link to="/login">log in</Link> or{' '}
        <Link to="/register">register</Link> to get started.
      </p>
    </div>
  );
};

export default HomePage;
