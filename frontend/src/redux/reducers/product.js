import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = { isLoading: false };

const productRequest = createAction('ProductRequest');
const productSuccess = createAction('ProductSuccess');
const productFailed = createAction('ProductFailed');
const clearError = createAction('ClearError');

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(productRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(productSuccess, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase(productFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    });
});
