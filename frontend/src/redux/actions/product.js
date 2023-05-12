import API from 'api';

// Create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: 'ProductCreateRequest' });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = API.post('/product/create-product', newForm, config);

    dispatch({ type: 'ProductCreateSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'ProductCreateSuccess', payload: error.response.data.message });
  }
};

// Get all product
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'GetAllProductsRequest' });
    const { data } = await API.get('/product/get-all-products');
    console.log(data.products)
    dispatch({
      type: 'GetAllProductsSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'GetAllProductsFailed',
      payload: error.response.data.message,
    });
  }
};
