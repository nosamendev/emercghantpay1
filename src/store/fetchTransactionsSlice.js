import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  status: 'idle',
  error:''
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {
    getError: (state, action) => {
      state.error = action.payload;
    },
    getTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    loading: (state, action) => {
      state.status = action.payload;
    }
  },
});

export const { getTransactions, getError, loading } = transactionsSlice.actions;

export default transactionsSlice.reducer;
