import { configureStore } from '@reduxjs/toolkit';
import generatedCardsReducer from './generatedCardsSlice';

export const store = configureStore({
  reducer: {
    generatedCards: generatedCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 