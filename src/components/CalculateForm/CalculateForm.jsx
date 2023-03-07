import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { useAuth } from 'hooks';
import { fetchDaily, fetchDailyRateByUserId } from 'redux/daily-rate/operation';
import { dailyRate } from 'redux/daily-rate/selection';
import { getDayInfo } from 'redux/day-endpoints/operation';
import { Recommendation } from 'components/Recommendation/Recommendation';
import { BackgroundSummery } from '../Background/BackgroundSummery/BackgroundSummery';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

const initialValues = {
  weight: '',
  height: '',
  age: '',
  desiredWeight: '',
  bloodType: '',
};

export const CalculateForm = () => {
  const [open, setOpen] = useState(false);
  const [formData] = useState(initialValues);

  const { isLoggedIn, user } = useAuth();

  const dailyRateState = useSelector(dailyRate);

  let { weight, bloodType, age, desiredWeight, height } = user.userData;

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  let dateToday = new Date().toLocaleDateString('uk-UA', options).split('.').reverse().join('-');

  const handelSubmit = values => {
    const { weight, age, desiredWeight, height, bloodType } = values;

    const newFormData = {
      weight: weight ? weight : user.userData.weight,
      age: age ? age : user.userData.age,
      desiredWeight: desiredWeight ? desiredWeight : user.userData.desiredWeight,
      height: height ? height : user.userData.height,
      bloodType: bloodType ? Number(bloodType) : user.userData.bloodType,
    };

    // isLoggedIn && dispatch(setDaySummary(newFormData));

    // setFormData(newFormData);

    const dateChoose = {
      date: dateToday,
    };
    const userLoginInfo = {
      userId: user.id,
      userData: newFormData,
    };

    isLoggedIn ? dispatch(fetchDailyRateByUserId(userLoginInfo)) : dispatch(fetchDaily(newFormData));

    isLoggedIn ? dispatch(getDayInfo(dateChoose)) : handleModalOpen();
  };

  return (
    <>
      <Box
        sx={{
          display: {
            xs: dailyRateState > 0 ? 'none' : 'block',
            md: 'block',
            lg: 'block',
          },
        }}
      >
        <Box component="main" sx={{ display: 'flex' }}>
          <Box
            component="div"
            sx={{
              paddingTop: {
                sm: '32px',
                md: '100px ',
                lg: '140px ',
              },
              paddingLeft: {
                xs: '20px',
                md: '32px ',
                lg: '16px ',
              },
              paddingBottom: {
                sm: isLoggedIn ? '41px' : '100px',
                md: isLoggedIn ? '48px' : '398px ',
                lg: '88px ',
              },
              paddingRight: { xs: '20px' },
              marginLeft: { sm: 'auto', md: '0' },
              marginRight: { sm: 'auto', md: '0' },
            }}
          >
            <Typography component="h1" variant="h1" sx={{ fontSize: { md: '34px' }, marginBottom: { md: '68px' } }}>
              Calculate your daily calorie
              <br />
              intake right now
            </Typography>
            <Formik initialValues={initialValues} onSubmit={handelSubmit}>
              {({
                values,

                handleChange,
                setFieldValue,

                handleBlur,
              }) => (
                <Form>
                  <Box
                    component="div"
                    sx={{
                      display: { sm: 'flex' },
                      flexDirection: { sm: 'column', md: 'row' },
                      marginBottom: { sm: '40px', md: '60px' },
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        marginRight: { md: '32px' },
                        display: { sm: 'flex' },
                        flexDirection: { sm: 'column' },
                        maxWidth: '240px',
                      }}
                    >
                      <TextField
                        fullWidth
                        name="height"
                        value={(values.height ? (height = false) : height) || values.height || ''}
                        type="number"
                        onChange={handleChange}
                        required
                        id="standard-required"
                        label="Height"
                        variant="standard"
                        color="primary"
                        sx={{
                          label: { color: '#9B9FAA' },
                          input: { paddingBottom: { md: '20px' } },
                        }}
                      />
                      <TextField
                        fullWidth
                        name="age"
                        value={(values.age ? (age = false) : age) || values.age || ''}
                        type="number"
                        onChange={handleChange}
                        required
                        id="standard-required"
                        label="Age"
                        variant="standard"
                        color="primary"
                        sx={{
                          label: { color: '#9B9FAA' },
                          input: { paddingBottom: { md: '20px' } },
                        }}
                      />
                      <TextField
                        fullWidth
                        value={(values.weight ? (weight = false) : weight) || values.weight || ''}
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        required
                        id="standard-required"
                        label="Weight"
                        variant="standard"
                        color="primary"
                        sx={{
                          label: { color: '#9B9FAA' },
                          input: {
                            paddingBottom: { md: '20px' },
                            input: { paddingBottom: { md: '20px' } },
                          },
                        }}
                      />
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        display: { sm: 'flex' },
                        flexDirection: { sm: 'column' },
                        maxWidth: '240px',
                      }}
                    >
                      <TextField
                        fullWidth
                        name="desiredWeight"
                        value={
                          (values.desiredWeight ? (desiredWeight = false) : desiredWeight) || values.desiredWeight || ''
                        }
                        onChange={handleChange}
                        type="number"
                        required
                        id="standard-required"
                        label="DesiredWeight"
                        variant="standard"
                        color="primary"
                        sx={{
                          label: { color: '#9B9FAA' },
                          input: { paddingBottom: { md: '20px' } },
                        }}
                      />
                      <FormControl
                        variant="standard"
                        sx={{
                          marginTop: { sm: '32px', md: '40px' },
                        }}
                      >
                        <FormLabel sx={{ color: '#9B9FAA' }} id="demo-row-radio-buttons-group-label">
                          Blood type *
                        </FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="bloodType">
                          <FormControlLabel
                            onChange={handleChange}
                            value={1}
                            // eslint-disable-next-line eqeqeq
                            checked={!!(values.bloodType === '1') ? !!(bloodType = '1') : '' || !!(bloodType == '1')}
                            control={<Radio sx={{ color: '#9B9FAA' }} />}
                            label="1"
                          />
                          <FormControlLabel
                            onChange={handleChange}
                            value={2}
                            // eslint-disable-next-line eqeqeq
                            checked={!!(values.bloodType === '2') ? !!(bloodType = '2') : '' || !!(bloodType == '2')}
                            control={<Radio sx={{ color: '#9B9FAA' }} />}
                            label="2"
                          />
                          <FormControlLabel
                            onChange={handleChange}
                            value={3}
                            // eslint-disable-next-line eqeqeq
                            checked={!!(values.bloodType === '3') ? !!(bloodType = '3') : '' || !!(bloodType == '3')}
                            control={<Radio sx={{ color: '#9B9FAA' }} />}
                            label="3"
                          />
                          <FormControlLabel
                            onChange={handleChange}
                            value={4}
                            // eslint-disable-next-line eqeqeq
                            checked={!!(values.bloodType === '4') ? !!(bloodType = '4') : '' || !!(bloodType == '4')}
                            control={<Radio sx={{ color: '#9B9FAA' }} />}
                            label="4"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      display: 'flex',
                      width: { sm: '320px', md: '100%' },
                      justifyContent: { md: 'flex-start' },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        marginLeft: { sm: 'auto', md: '0', lg: '307px' },
                        marginRight: { sm: 'auto', md: '0' },
                      }}
                    >
                      Start losing weight
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          {isLoggedIn && <BackgroundSummery />}
        </Box>
      </Box>
      {open && <Recommendation open={open} close={setOpen} values={formData} />}
    </>
  );
};
