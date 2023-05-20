import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
        console.log(action.payload);
      state.list.push(action.payload);
    },
    clearProducts: (state) => {
      state.list = [];
    },
    removeProductById: (state, action) => {
        console.log(action.addedItemUid);
        state.list = state.list.filter(x => x.addedItemUid !== action.payload)
    }
  },
});

export const { addProduct, clearProducts, removeProductById } = productSlice.actions;

export default productSlice.reducer;