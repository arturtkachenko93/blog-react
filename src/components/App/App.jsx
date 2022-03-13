import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Articles from '../Articles';
import ArticleMarkdown from '../ArticleMarkdown';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import Profile from '../Profile';

import RequireAuth from '../../hoc/RequireAuth';
import { AuthProvider } from '../../hoc/AuthProvider';

import './app.scss';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Articles />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleMarkdown />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="profile"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="create"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
