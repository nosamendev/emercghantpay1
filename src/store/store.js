import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from '../store/fetchTransactionsSlice';

export const store = configureStore({
  reducer: {
    items: transactionsSlice,
  },
});