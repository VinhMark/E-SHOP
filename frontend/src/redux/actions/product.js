import API from 'api';

// Create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: 'ProductRequest' });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = API.post('/product/create-product', newForm, config);

    dispatch({ type: 'ProductSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'ProductFailed', payload: error.response.data.message });
  }
};

// Get all product
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'ProductRequest' });
    const { data } = await API.get('/product/get-all-products');
    dispatch({
      type: 'ProductSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'ProductFailed',
      payload: error.response.data.message,
    });
  }
};

export const getAllProductsShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: 'ProductRequest' });
    const { data } = await API.get('/product/get-all-products-shop/' + shopId);
    dispatch({
      type: 'ProductSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'ProductFailed',
      payload: error.response.data.message,
    });
  }
};
