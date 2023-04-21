import API from 'api';

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });

    const { data } = await API.get('/user/getUser', {
      withCredentials: true,
    });
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFailed',
      payload: error.response.data.message,
    });
  }
};

// clear user
export const clearUser = () => async (dispatch) => {
  dispatch({ type: 'clearUser' });
};
