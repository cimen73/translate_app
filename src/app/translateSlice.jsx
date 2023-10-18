import { createSlice } from '@reduxjs/toolkit';
import { getAnswer, getLanguages } from './actions';

const initialState = {
  languages: [],
  answer: '',
  isLoading: true,
  isError: false,
};

export const translateSlice = createSlice({
  name: 'translate',
  initialState,
  //"extraReducer" is used instead of "reducers" in thunk (in asynchronous actions).
  extraReducers: {
    // What to do while waiting for the response to the request.
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    // If the request is answered.
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    // What to do if there is no response to the request or if it is incorrect.
    [getLanguages.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Request for translation to api.
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },

    [getAnswer.fulfilled]: (state, action) => {
      state.answer = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    [getAnswer.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
  // Synchronous actions are defined in the normal reducer.
  reducers: {
    clearAnswer: (state, action) => {
      state.answer = '';
    },
  },
});

export const { clearAnswer } = translateSlice.actions;

export default translateSlice.reducer;