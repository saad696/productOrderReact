import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  cart: [],
  totalItems: 0
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    clearProducts: (state) => {
      state.list = [];
    },
    removeProductById: (state, action) => {
        state.list = state.list.filter(x => x.addedItemUid !== action.payload)
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, ...action.payload]
      console.log(state.cart);
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    getItemsInCart: (state) => {
      state.totalItems = JSON.parse(localStorage.getItem("cart"))?.length
    }
  },
});

export const { addProduct, clearProducts, removeProductById, addToCart, getItemsInCart } = productSlice.actions;

export default productSlice.reducer;