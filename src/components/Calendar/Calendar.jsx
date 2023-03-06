import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { getDayInfo } from 'redux/day-endpoints/operation';
import { setDate } from 'redux/day-endpoints/slice';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { Box, Stack } from '@mui/material';
import { InputCalendar } from './Calendar.styled';
import { selectNotAllowedProducts } from 'redux/auth/selectors';
const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

export const Calendar = () => {
  const [dateValue, setDateValue] = useState(formattedDate);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const notAllowedProductsState = useSelector(selectNotAllowedProducts);
  useEffect(() => {
    if (!isLoggedIn || notAllowedProductsState.length < 1) {
      return;
    }

    const requestInfo = { date: formattedDate };

    dispatch(setDate(requestInfo));

    dispatch(getDayInfo(requestInfo));
  }, [dispatch, isLoggedIn, notAllowedProductsState]);

  const onChange = newValue => {
    setDateValue(newValue.format('YYYY-MM-DD'));
    const dateObject = { date: newValue.format('YYYY-MM-DD') };
    dispatch(getDayInfo(dateObject));

    dispatch(setDate(dateObject));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        <DesktopDatePicker
          inputFormat="MM.DD.YYYY"
          value={dateValue}
          onChange={onChange}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: { md: '60px' },
              }}
            >
              <InputCalendar ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};
