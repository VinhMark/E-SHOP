import API from 'api';

export const getAllOrderByShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: 'OrderRequest' });

    const { data } = await API.get('/order/get-seller-all-orders/' + shopId);

    dispatch({ type: 'OrderRequestSuccess', payload: data.orders });
  } catch (error) {
    dispatch({ type: 'OrderRequestFailed', payload: error });
  }
};
