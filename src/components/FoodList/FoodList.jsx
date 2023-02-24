import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDaily, fetchDailyRateByUserId } from 'redux/daily-rate/operation';
import { notAllowedProducts } from 'redux/daily-rate/selection';
import { randomProducts } from 'redux/daily-rate/selection';
import { selectAccessProducts } from 'redux/auth/selectors';

import { useAuth } from 'hooks/useAuth';
import { Typography } from '@mui/material';

export const FoodList = memo(({ values }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useAuth();
  const randomProductsState = useSelector(randomProducts);
  const randomProductsAuthState = useSelector(selectAccessProducts);

  const notAllowedProductsList = isLoggedIn
    ? randomProductsAuthState
    : randomProductsState;

  const userLoginInfo = {
    userId: user.id,
    userData: values,
  };

  useEffect(() => {
    isLoggedIn
      ? dispatch(fetchDailyRateByUserId(userLoginInfo))
      : dispatch(fetchDaily(values));
  }, [values]);

  let notAllowedProductsState = useSelector(notAllowedProducts);
  if (isLoggedIn) {
    // eslint-disable-next-line no-unused-vars
    notAllowedProductsState = user.userData.notAllowedProducts;
  }

  return (
    <Typography variant="ol" component="ol">
      {notAllowedProductsList.map(item => {
        return (
          <Typography variant="li" component="li">
            {item}
          </Typography>
        );
      })}
    </Typography>
  );
});
