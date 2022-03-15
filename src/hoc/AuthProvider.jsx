import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.auth || null);

  useEffect(() => {
  }, [user]);
  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };
  const signout = (cb) => {
    setUser(null);
    localStorage.removeItem('auth');
    cb();
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
