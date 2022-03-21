import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.auth || null);
  const [article, setArticle] = useState();

  useEffect(() => {
  }, [user, article]);

  const signup = (newUser, cb) => {
    setUser(newUser);
    cb();
  };

  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };

  const signout = (cb) => {
    setUser(null);
    localStorage.removeItem('auth');
    cb();
  };

  const setArticleData = (data) => {
    setArticle(data);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    article,
    signin,
    signout,
    signup,
    setArticleData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
