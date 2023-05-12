const { createReducer, createAction } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  isStart: false,
};

const loadingRequest = createAction('LoadRequest');
const endLoadingRequest = createAction('EndLoadRequest');
const startApp = createAction('StartApp');

export const commonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(endLoadingRequest, (state) => {
      state.isLoading = false;
    })
    .addCase(startApp, (state) => {
      state.isStart = true;
    });
});
