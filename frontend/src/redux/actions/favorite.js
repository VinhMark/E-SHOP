export const addToWishList = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'AddWishList',
    payload: data,
  });
  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems));
};

export const removeToWishList = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'RemoveWishList',
    payload: data,
  });
  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems));
};
