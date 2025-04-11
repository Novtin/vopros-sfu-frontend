import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatingsState {
  [questionId: number]: {
    currentRating: 'none' | 'up' | 'down';
  };
}

const initialState: RatingsState = {};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ questionId: number; rating: 'none' | 'up' | 'down' }>) => {
      const { questionId, rating } = action.payload;
      state[questionId] = { currentRating: rating };
    },
    resetRating: (state, action: PayloadAction<number>) => {
      const questionId = action.payload;
      state[questionId] = { currentRating: 'none' };
    },
  },
});

export const { setRating, resetRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
