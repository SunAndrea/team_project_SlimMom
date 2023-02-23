import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';

import { useAuth } from 'hooks/useAuth';
import { fetchCurrentUser } from 'redux/auth/operation';

import { CalculatorPage } from 'pages/Calculator';
import { DiaryPage } from 'pages/Diary';
import { ErrorPage } from 'pages/ErrorPage';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';

import { Layout } from './Layout/Layout';

export const App = () => {
  const dispatch = useDispatch();
  const { sessionId } = useAuth();

  useEffect(() => {
    if (!sessionId) {
      return;
    }
    dispatch(fetchCurrentUser());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CalculatorPage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={RegisterPage} redirectTo="/diary" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={LoginPage} redirectTo="/diary" />
            }
          />
          <Route
            path="/diary"
            element={<PrivateRoute component={DiaryPage} redirectTo="/login" />}
          />
        </Route>
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </>
  );
};
