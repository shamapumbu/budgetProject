// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import LinkBankAccount from './components/LinkBankAccount';
import Transactions from './components/Transactions';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Navbar from './Navbar/Navbar';
import Logout from './components/Logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isLoggedIn}
            element={<Dashboard />}
          />
          <PrivateRoute
            path="/link-bank-account"
            isAuthenticated={isLoggedIn}
            element={<LinkBankAccount />}
          />
          <PrivateRoute
            path="/transactions"
            isAuthenticated={isLoggedIn}
            element={<Transactions />}
          />
          <PrivateRoute
            path="/logout"
            isAuthenticated={isLoggedIn}
            element={<Logout onLogout={() => setIsLoggedIn(false)} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
