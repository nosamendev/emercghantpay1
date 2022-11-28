import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import data from '../api/data';

const initialState = {
  transactions: [],
  status: 'idle',
  error:''
};


export const fetchTransactions = createAsyncThunk(
  'data/fetchTransactions',
  async () => {  
        try {
          const response = await data.get('http://localhost:3000/payment_transactions');
          return response.data;
        } catch (error) {
          return error;
        }
      }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.transactions = action.payload;
        if (action.payload.message) {
          state.error = action.payload.message;
          state.transactions = [];
        }
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
        state.transactions = [];
      });
  },
});

export default transactionsSlice.reducer;
