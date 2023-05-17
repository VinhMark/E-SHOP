import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const orderRequest = createAction('OrderRequest');
const orderRequestSuccess = createAction('OrderRequestSuccess');
const orderRequestFailed = createAction('OrderRequestFailed');
const orderClearError = createAction('OrderClearError');

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(orderRequest, (state) => {
      state.loading = true;
    })
    .addCase(orderRequestSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(orderRequestFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(orderClearError, (state) => {
      state.error = null;
    });
});
