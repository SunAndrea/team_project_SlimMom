import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyRateByUserId } from 'redux/daily-rate/operation';
import { fetchCurrentUser, login, logout, register } from './operation';

const initialState = {
  user: { username: null, email: null, userData: {} },
  randomProducts: [],
  todaySummary: null,
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  isLoggedIn: false,
  isFetchingCurrent: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.sessionId = action.payload.sid;
      // state.isLoggedIn = true;
      window.alert('registration done');
    },
    [login.fulfilled](state, action) {
      state.user = action.payload.user;
      state.todaySummary = action.payload.todaySummary;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.sessionId = action.payload.sid;
      state.isLoggedIn = true;

      for (let index = 4; index > state.randomProducts.length; index - 1) {
        state.randomProducts.push(
          action.payload.user.userData.notAllowedProducts[
            getRandomElement(action.payload.user.userData.notAllowedProducts.length - 1)
          ]
        );
      }
    },
    [logout.fulfilled](state, action) {
      state.user = { username: null, email: null, userData: {} };
      state.todaySummary = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.sessionId = null;
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state) {
      state.isFetchingCurrent = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      const { data, refresh } = action.payload;

      if (refresh) {
        state.user = data;
        state.accessToken = refresh.newAccessToken;
        state.refreshToken = refresh.newRefreshToken;
        state.sessionId = refresh.sid;

        for (let index = 4; index > state.randomProducts.length; index - 1) {
          state.randomProducts.push(
            data.userData.notAllowedProducts[getRandomElement(data.userData.notAllowedProducts.length - 1)]
          );
        }
      } else {
        state.user = action.payload;
        for (let index = 4; index > state.randomProducts.length; index - 1) {
          state.randomProducts.push(
            action.payload.userData.notAllowedProducts[
              getRandomElement(action.payload.userData.notAllowedProducts.length - 1)
            ]
          );
        }
      }

      state.isFetchingCurrent = false;
      state.isLoggedIn = true;
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetchingCurrent = false;
    },
    [fetchDailyRateByUserId.fulfilled](state, action) {
      state.user.userData = action.meta.arg.userData;
      state.user.userData.notAllowedProducts = action.payload.notAllowedProducts;
      state.user.userData.dailyRate = action.payload.dailyRate;
    },
  },
});

function getRandomElement(max) {
  return Math.floor(Math.random() * max - 1);
}

export const authReducer = authSlice.reducer;
