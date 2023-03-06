import { createSlice } from '@reduxjs/toolkit';
import { fetchDaily } from './operation';

const initialState = {
  dailyRate: 0,
  notAllowedProducts: [],
  randomProducts: [],
};

const dailySlice = createSlice({
  name: 'userDaily',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDaily.fulfilled]: (state, action) => {
      const notAllowedProducts = action.payload.notAllowedProducts;

      state.dailyRate = action.payload.dailyRate;
      state.notAllowedProducts = notAllowedProducts;

      for (let index = 4; index > state.randomProducts.length; index - 1) {
        state.randomProducts.push(state.notAllowedProducts[getRandomElement(notAllowedProducts.length - 1)]);
      }
    },
  },
});

function getRandomElement(max) {
  return Math.floor(Math.random() * max - 1);
}

export default dailySlice.reducer;
