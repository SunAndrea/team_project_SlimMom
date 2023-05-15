import { useDispatch } from 'react-redux';
import { TextField, Box, Button, Typography } from '@mui/material';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { login } from 'redux/auth/operation';

const validationSchemeForm = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(8).required('Password may contain at least 8 characters'),
});

const initialValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(login(values));

    resetForm();
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',

        flexDirection: { xs: 'column' },
        paddingTop: {
          sm: '40px',
          md: '160px ',
          lg: '160px ',
        },
        paddingLeft: {
          sm: '20px',
          md: '32px ',
          lg: '16px ',
        },
        paddingBottom: {
          sm: '100px',
          md: '419px ',
          lg: '179px ',
        },
        paddingRight: { sm: '20px' },
      }}
    >
      <Typography
        sx={{
          marginLeft: { xs: 'auto', md: '0px' },
          marginRight: { xs: 'auto', md: '0px' },
        }}
        variant="h5"
      >
        Log In
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchemeForm}>
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',

                  marginLeft: { xs: 'auto', md: '0px' },
                  marginRight: { xs: 'auto', md: '0px' },
                  marginBottom: '60px',
                  maxWidth: { sm: '280px', md: '240px' },
                  width: '100%',
                }}
              >
                <TextField
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    label: { color: '#9B9FAA' },
                  }}
                  name="email"
                  label="Email"
                  value={values.email}
                  placeholder="example@mail.com"
                  variant="standard"
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    label: { color: '#9B9FAA' },
                  }}
                  name="password"
                  value={values.password}
                  label="Password"
                  type="password"
                  placeholder="Min 8 characters"
                  variant="standard"
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  marginLeft: { xs: 'auto', md: '0px' },
                  marginRight: { xs: 'auto', md: '0px' },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'capitalize',
                    marginBottom: { xs: '20px', md: '0px' },
                    marginRight: { md: '32px' },
                    padding: { xs: '13px 50px', lg: '13px 37px' },
                  }}
                >
                  Log in
                </Button>

                <Button
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  variant="outlined"
                  href="/team_project_SlimMom/register"
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
