import API from 'api';

// load shop
export const loadShop = () => async (dispatch) => {
  try {
    // set loading true
    dispatch({
      type: 'LoadShopRequest',
    });

    const { data } = await API.get('/shop/getShop', { withCredentials: true });
    // set data to store
    dispatch({
      type: 'LoadShopSuccess',
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: 'LoadShopFailed',
      payload: error.response.data.message,
    });
  }
};
