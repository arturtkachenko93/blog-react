import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Articles from '../Articles';
import ArticleMarkdown from '../ArticleMarkdown';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import Profile from '../Profile';
import NotFound from '../NotFound';
import RequireAuth from '../../hoc/RequireAuth';
import IsAuth from '../../hoc/IsAuth';
import { AuthProvider } from '../../hoc/AuthProvider';

import './app.scss';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Articles />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleMarkdown />} />
        <Route
          path="sign-in"
          element={(
            <IsAuth>
              <SignIn />
            </IsAuth>
          )}
        />
        <Route
          path="sign-up"
          element={(
            <IsAuth>
              <SignUp />
            </IsAuth>
          )}
        />
        <Route
          path="profile"
          element={(
            <RequireAuth>
              <Profile />
            </RequireAuth>
          )}
        />
        <Route
          path="new-article"
          element={(
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          )}
        />
        <Route
          path="articles/:slug/:edit"
          element={(
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
