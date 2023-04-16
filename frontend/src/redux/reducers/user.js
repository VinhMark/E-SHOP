const { createReducer, createAction } = require('@reduxjs/toolkit');

const initialState = {
  isAuthenticated: false,
};

const loadUserRequest = createAction('LoadUserRequest');
const loadUserSuccess = createAction('LoadUserSuccess');
const loadUserFailed = createAction('LoadUserFailed');
const clearError = createAction('clearError');
const clearUser = createAction('clearUser');

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserRequest, (state, action) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loadUserFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
});
