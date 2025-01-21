import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormVisible: false,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    toggleFormVisibility: state => {
      state.isFormVisible = !state.isFormVisible;
    },
    hideForm: state => {
      state.isFormVisible = false;
    },
  },
});

export const { toggleFormVisibility, hideForm } = questionSlice.actions;
export default questionSlice.reducer;
