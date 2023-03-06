import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { TextField, Autocomplete, Box, Button, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { productSearch } from 'redux/productSearch/operation';
import { selectProduct } from 'redux/productSearch/selection';
import { addEatenProduct } from 'redux/day-endpoints/operation';
import { selectDay } from 'redux/day-endpoints/selectors';
import { selectNotAllowedProducts } from 'redux/auth/selectors';

export const AddProduct = () => {
  const dispatch = useDispatch();

  const day = useSelector(selectDay);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const notAllowedProductsState = useSelector(selectNotAllowedProducts);

  let initialValues = {
    name: '',
    weight: '',
    id: null,
  };

  const handleSubmit = (values, { resetForm }) => {
    const requestInfo = {
      date: day.date,
      productId: values.id,
      weight: values.weight,
    };

    if (requestInfo.productId === null) {
      resetForm();
      return;
    }
    dispatch(addEatenProduct(requestInfo));

    resetForm();
  };

  const onChange = evt => {
    if (notAllowedProductsState.length < 1) {
      window.alert('Please, count your daily rate first');
    }
    dispatch(productSearch(evt.target.value));
  };

  const products = useSelector(selectProduct);
  const autocompleteOptions = products.map(product => {
    return {
      label: product.title.ua,
      id: product._id,
    };
  });

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                display: { xs: 'flex' },
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Autocomplete
                freeSolo
                disablePortal
                id="combo-box-demo"
                options={autocompleteOptions}
                sx={{ width: '240px', marginRight: { lg: '48px', md: '22px' } }}
                value={values.name}
                onChange={(e, newValue) => {
                  handleChange(e);
                  if (!newValue) {
                    return;
                  }
                  setFieldValue('name', newValue.label);
                  setFieldValue('id', newValue.id);
                }}
                renderInput={params => (
                  <TextField
                    sx={{
                      width: '100%',
                      marginBottom: { xs: '32px', md: '0' },
                      maxWidth: { xs: '280px', md: '240px' },
                      marginRight: { lg: '50px' },
                      label: { color: '#9B9FAA' },
                      padding: { xs: '8px 0px 0px 0px', md: '20px 0px 0px 0px' },
                    }}
                    type="input"
                    onChange={onChange}
                    {...params}
                    label="Enter product name"
                    name="name"
                    id="name"
                    variant="standard"
                  />
                )}
              />
              <TextField
                sx={{
                  width: '100%',
                  maxWidth: { xs: '280px', md: '107px' },
                  marginRight: { md: '87px', lg: '60px' },
                  label: { color: '#9B9FAA' },
                  padding: { xs: '8px 0px 0px 0px', md: '20px 0px 0px 0px' },
                  marginBottom: { xs: '60px', md: '0' },
                }}
                id="grams"
                label="Weight"
                type="input"
                variant="standard"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                inputProps={{ pattern: '[0-9]*' }}
              />
              {mobile ? (
                <Button
                  sx={{
                    textTransform: 'capitalize',
                    marginBottom: { xs: '20px', md: '0px' },
                    marginRight: { md: '32px' },
                    padding: { xs: '13px 50px', lg: '13px 37px' },
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              ) : (
                <Button type="submit" color="primary" aria-label="add" variant="circular">
                  <AddIcon />
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
