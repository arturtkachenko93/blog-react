import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const IsAuth = ({ children }) => {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default IsAuth;
