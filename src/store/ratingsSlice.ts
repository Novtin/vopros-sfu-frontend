import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatingsState {
  [id: number]: {
    currentRating: 'none' | 'up' | 'down';
  };
}

const initialState: RatingsState = {};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ id: number; rating: 'none' | 'up' | 'down' }>) => {
      const { id, rating } = action.payload;
      state[id] = { currentRating: rating };
    },
    resetRating: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state[id] = { currentRating: 'none' };
    },
  },
});

export const { setRating, resetRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
