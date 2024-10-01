import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ allowrole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Redirect to login if token is missing
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if the user's role is not allowed
  if (!allowrole.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If the token and role are valid, allow access to the route
  return <Outlet />;
}

export default PrivateRoute;
