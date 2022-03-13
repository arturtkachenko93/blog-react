import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.user || null);

  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };
  const signout = (cb) => {
    localStorage.removeItem(user);
    cb();
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
