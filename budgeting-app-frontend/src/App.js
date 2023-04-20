import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import LinkBankAccount from './components/LinkBankAccount';
import Login from './components/Login';
import Register from './components/Register';
import Transactions from './components/Transactions';
import DashboardMessages from './components/DashboardMessages';
import DashboardTasks from './components/DashboardTasks';
import Navbar from './Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwt_decode(token);
      setUserId(decoded.id);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Invalid token:', err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  const RequireAuth = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard userId={userId} />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardMessages />} />
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="tasks" element={<DashboardTasks />} />
        </Route>
        <Route
          path="/link-bank-account"
          element={
            <RequireAuth>
              <LinkBankAccount />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth>
              <Transactions userId={userId} />
            </RequireAuth>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
