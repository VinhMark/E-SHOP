import API from 'api';

// load shop
export const loadShop = () => async (dispatch) => {
  try {
    // set loading true
    dispatch({
      type: 'StartApp',
    });
    dispatch({ type: 'LoadRequest' });

    const { data } = await API.get('/shop/getShop', { withCredentials: true });
    // set data to store
    dispatch({
      type: 'LoadShopSuccess',
      payload: data.shop,
    });
    // End request
    dispatch({ type: 'EndLoadRequest' });
  } catch (error) {
    dispatch({
      type: 'LoadShopFailed',
      payload: error.response.data.message,
    });
    // End request
    dispatch({ type: 'EndLoadRequest' });
  }
};
