export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsFetching = state => state.auth.isFetchingCurrent;

export const selectUser = state => state.auth.user;

export const selectUserName = state => state.auth.user.username;

export const selectSessionId = state => state.auth.sessionId;

export const selectRefreshToken = state => state.auth.refreshToken;

export const selectAccessToken = state => state.auth.accessToken;

export const selectAccessProducts = state => state.auth.randomProducts;

export const selectNotAllowedProducts = state => state.auth.user.userData.notAllowedProducts;
