import { useAuth } from 'hooks/useAuth';
import { CalculatorPage } from 'pages/Calculator';
import { DiaryPage } from 'pages/Diary';
import { ErrorPage } from 'pages/ErrorPage';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCurrentUser } from 'redux/auth/operation';
import { selectIsFetching } from 'redux/auth/selectors';
import { Layout } from './Layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const { sessionId } = useAuth();
  const isFetchingCurrentUser = useSelector(selectIsFetching);

  useEffect(() => {
    if (!sessionId) {
      return;
    }
    dispatch(fetchCurrentUser());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CalculatorPage />} />
            <Route path="/register" element={<RestrictedRoute component={RegisterPage} redirectTo="/diary" />} />
            <Route path="/login" element={<RestrictedRoute component={LoginPage} redirectTo="/diary" />} />
            <Route path="/diary" element={<PrivateRoute component={DiaryPage} redirectTo="/login" />} />
          </Route>
          <Route element={<ErrorPage />} path="*" />
        </Routes>
      </>
    )
  );
};
