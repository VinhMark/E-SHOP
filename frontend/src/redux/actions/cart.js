export const addToCart = (data) => async (dispatch, getSate) => {
  dispatch({
    type: 'AddCart',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getSate().cart.cart));

  return data;
};

// Remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'RemoveFromCart',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));

  return data;
};

// Update qty from cart
export const incrementQty = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'IncrementQty',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

// Update qty from cart
export const decrementQty = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'DecrementQty',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};
