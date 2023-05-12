import { createAction, createReducer } from '@reduxjs/toolkit';

const initialSate = {
  wishItems: JSON.parse(localStorage.getItem('wishItems')) || [],
};

const addWishList = createAction('AddWishList');
const removeWishList = createAction('RemoveWishList');

export const favoriteReducer = createReducer(initialSate, (builder) => {
  builder
    .addCase(addWishList, (state, action) => {
      return {
        ...state,
        wishItems: [...state.wishItems, action.payload],
      };
    })
    .addCase(removeWishList, (state, action) => {
      const newState = { ...state };
      newState.wishItems = newState.wishItems.filter((i) => i._id !== action.payload);
      return newState;
    });
});
