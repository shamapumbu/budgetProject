import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

export default PrivateRoute;
