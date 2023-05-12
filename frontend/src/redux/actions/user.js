import API from 'api';
import { toast } from 'react-toastify';

//load user
export const loadUser = () => async (dispatch) => {
  try {
    // set loading true
    dispatch({
      type: 'StartApp',
    });
    // loading common is not user
    dispatch({
      type: 'LoadRequest',
    });

    const { data } = await API.get('/user/getUser', {
      withCredentials: true,
    });

    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });

    dispatch({
      type: 'EndLoadRequest',
    });
  } catch (error) {
    dispatch({
      type: 'HasError',
      payload: error.response.data.message,
    });
    dispatch({
      type: 'EndLoadRequest',
    });
  }
};

// clear user
export const clearUser = () => async (dispatch) => {
  dispatch({ type: 'ClearUser' });
};

// update user
export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: 'StartLoading' });
    const { data } = await API.put('/user/updateUser', user, { withCredentials: true });
    if (data.success) {
      toast.success('Update user successfully!');
    }
    dispatch({
      type: 'UpdateUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'HasError',
      payload: error.response.data,
    });
  }
};

// update avatar user
export const updateAvatarUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: 'StartLoading' });
    const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const { data } = await API.patch('/user/update-avatar', user, config);
    if (data.success) {
      toast.success('Update avatar successfully!');
    }

    dispatch({
      type: 'UpdateUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'HasError',
      payload: error.response.data,
    });
  }
};

export const updateUserAddressSuccess = (address) => async (dispatch) => {
  try {
    dispatch({ type: 'StartLoading' });

    const { data } = await API.put('/user/update-user-addresses', address, { withCredentials: true });
    toast.success('Added address successfully!');
    dispatch({
      type: 'UpdateUserAddressSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'HasError',
      payload: error.response.data,
    });
  }
};
