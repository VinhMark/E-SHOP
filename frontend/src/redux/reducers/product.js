import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = { isLoading: false };

const productCreateRequest = createAction('ProductCreateRequest');
const productCreateSuccess = createAction('ProductCreateSuccess');
const productCreateFailed = createAction('ProductCreateFailed');

const getAllProductsRequest = createAction('GetAllProductsRequest');
const getAllProductsSuccess = createAction('GetAllProductsSuccess');
const getAllProductsFailed = createAction('GetAllProductsFailed');
const clearError = createAction('ClearError');

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(productCreateRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(productCreateSuccess, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase(productCreateFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(getAllProductsRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllProductsSuccess, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase(getAllProductsFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
