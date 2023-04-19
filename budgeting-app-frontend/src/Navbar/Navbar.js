import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className={styles.navbar}>
      {isLoggedIn && (
        <>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/link-bank-account">Link Bank Account</Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
