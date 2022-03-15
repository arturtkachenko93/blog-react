import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
