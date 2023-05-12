import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const addCart = createAction('AddCart');
const removeFromCart = createAction('RemoveFromCart');
const incrementQty = createAction('IncrementQty');
const decrementQty = createAction('DecrementQty');

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCart, (state, action) => {
      const item = action.payload;
      const index = state.cart.findIndex((i) => i._id === item._id);
      if (index > 0) {
        const newState = { ...state };
        newState.cart[index].qty += 1;
        return state;
      }

      return {
        ...state,
        cart: [...state.cart, item],
      };
    })
    .addCase(removeFromCart, (state, action) => {
      const newState = { ...state };
      newState.cart = newState.cart.filter((i) => i._id !== action.payload);
      return newState;
    })
    .addCase(incrementQty, (state, action) => {
      const newState = { ...state };
      const index = newState.cart.findIndex((i) => i._id === action.payload);
      newState.cart[index].qty += 1;
      return state;
    })
    .addCase(decrementQty, (state, action) => {
      const newState = { ...state };
      const index = newState.cart.findIndex((i) => i._id === action.payload);
      newState.cart[index].qty -= 1;
      return state;
    });
});
