import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const eventRequest = createAction('EventRequest');
const eventRequestSuccess = createAction('EventRequestSuccess');
const eventRequestFailed = createAction('EventRequestFailed');
const eventClearError = createAction('EventClearError');

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(eventRequest, (state) => {
      state.loading = true;
    })
    .addCase(eventRequestSuccess, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    })
    .addCase(eventRequestFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(eventClearError, (state) => {
      state.error = null;
    });
});
