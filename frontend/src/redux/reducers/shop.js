import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  isSeller: false,
};

const loadShopRequest = createAction('LoadShopRequest');
const loadShopSuccess = createAction('LoadShopSuccess');
const loadShopFailed = createAction('LoadShopFailed');
const clearErrors = createAction('ClearErrors');

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadShopRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(loadShopSuccess, (state, action) => {
      state.isLoading = false;
      state.seller = action.payload;
      state.isSeller = true;
    })
    .addCase(loadShopFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
