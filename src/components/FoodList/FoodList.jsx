import { memo } from 'react';
import { useSelector } from 'react-redux';
import { randomProducts } from 'redux/daily-rate/selection';
import { selectAccessProducts } from 'redux/auth/selectors';

import { useAuth } from 'hooks/useAuth';
import { Typography } from '@mui/material';

export const FoodList = memo(() => {
  const { isLoggedIn } = useAuth();
  const randomProductsState = useSelector(randomProducts);
  const randomProductsAuthState = useSelector(selectAccessProducts);

  const notAllowedProductsList = isLoggedIn ? randomProductsAuthState : randomProductsState;

  // let notAllowedProductsState = useSelector(notAllowedProducts);
  // if (isLoggedIn) {
  //   // eslint-disable-next-line no-unused-vars
  //   notAllowedProductsState = user.userData.notAllowedProducts;
  // }

  return (
    <Typography variant="ol" component="ol">
      {notAllowedProductsList.includes(null) || notAllowedProductsList.includes(undefined) ? (
        <></>
      ) : (
        notAllowedProductsList.map((item, index) => {
          return (
            <Typography key={index} variant="li" component="li">
              {item}
            </Typography>
          );
        })
      )}
    </Typography>
  );
});
