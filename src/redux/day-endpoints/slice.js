import { createSlice } from '@reduxjs/toolkit';
import { addEatenProduct, deleteEatenProduct, getDayInfo } from './operation';

const initialState = {
  date: null,
  dateId: null,
  eatenProducts: [],
  deleteProductId: null,
  error: null,
  daySummary: {},
};

const handlePending = () => {};
const handleRejected = () => {};

const dayEndpointsSlice = createSlice({
  name: 'dayEndpoints',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setDeleteProductId: (state, action) => {
      state.deleteProductId = action.payload;
    },
    setDaySummary: (state, action) => {
      state.daySummary = { ...action.payload.daySummary };
    },
  },
  extraReducers: {
    [addEatenProduct.fulfilled](state, action) {
      state.eatenProducts.push(action.payload.eatenProduct);
      state.daySummary = { ...action.payload.daySummary };
      state.date.id = action.payload.day.id;
    },
    [getDayInfo.fulfilled](state, action) {
      if (!action.payload.eatenProducts) {
        state.eatenProducts = [];
        return;
      }
      state.daySummary = action.payload.daySummary;
      state.dateId = action.payload.id;
      state.eatenProducts = [...action.payload.eatenProducts];
    },
    [addEatenProduct.pending]: handlePending,
    [deleteEatenProduct.rejected]: handleRejected,
    [deleteEatenProduct.fulfilled]: (state, action) => {
      const { productId, data } = action.payload;
      state.daySummary = { ...data.newDaySummary };
      state.eatenProducts = state.eatenProducts.filter(product => product.id !== productId);
    },
  },
});

export const { setDate, setDeleteProductId, setDaySummary } = dayEndpointsSlice.actions;

export const dayEndpointsReducer = dayEndpointsSlice.reducer;
