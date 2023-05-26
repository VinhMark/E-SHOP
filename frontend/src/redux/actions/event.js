import API from 'api';

export const getAllEventByShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: 'EventRequest' });

    const { data } = await API.get('/event/get-all-events-shop/' + shopId);

    dispatch({ type: 'EventRequestSuccess', payload: data.events });
  } catch (error) {
    dispatch({ type: 'EventRequestFailed', payload: error });
  }
};
