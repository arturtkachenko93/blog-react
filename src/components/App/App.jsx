import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Articles from '../Articles';
import ArticleMarkdown from '../ArticleMarkdown';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';

import RequireAuth from '../../hoc';

import './app.scss';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Articles />} />
      <Route path="articles" element={<Articles />} />
      <Route path="articles/:slug" element={<ArticleMarkdown />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route
        path="profile"
        element={(
          <RequireAuth>
            <Profile />
          </RequireAuth>
      )}
      />
    </Route>
  </Routes>
);

export default App;
