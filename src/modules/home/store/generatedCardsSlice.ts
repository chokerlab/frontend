import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeneratedCardsState {
  cards: string[];
}

const initialState: GeneratedCardsState = {
  cards: [],
};

export const generatedCardsSlice = createSlice({
  name: 'generatedCards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<string[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = generatedCardsSlice.actions;
export default generatedCardsSlice.reducer; 