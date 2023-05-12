import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  isSeller: false,
  isLoading: false,
};

const loadShopSuccess = createAction('LoadShopSuccess');
const loadShopFailed = createAction('LoadShopFailed');
const clearErrors = createAction('ClearErrors');
const shopLogout = createAction('ShopLogout');

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadShopSuccess, (state, action) => {
      state.isLoading = true;
      state.seller = action.payload;
      state.isSeller = true;
    })
    .addCase(loadShopFailed, (state, action) => {
      state.error = action.payload;
      state.isSeller = false;
      state.isLoading = false;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    })
    .addCase(shopLogout, (state) => {
      state.isSeller = false;
      state.seller = null;
    });
});
