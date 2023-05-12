const { createReducer, createAction } = require('@reduxjs/toolkit');

const initialState = {
  isAuthenticated: false,
};

const startLoading = createAction('StartLoading');
const loadUserSuccess = createAction('LoadUserSuccess');
const loadUserFailed = createAction('LoadUserFailed');
const hasError = createAction('HasError');
const clearError = createAction('ClearError');
const clearUser = createAction('ClearUser');
const updateUserSuccess = createAction('UpdateUserSuccess');
const updateUserAddressSuccess = createAction('UpdateUserAddressSuccess');

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(startLoading, (state, action) => {
      state.loading = false;
      return state;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      return state;
    })
    .addCase(loadUserFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      return state;
    })
    .addCase(hasError, (state, action) => {
      state.error = action.payload;
      return state;
    })
    .addCase(clearError, (state) => {
      state.error = null;
      return state;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      return state;
    })
    .addCase(updateUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      return state;
    })
    .addCase(updateUserAddressSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      return state;
    });
});
