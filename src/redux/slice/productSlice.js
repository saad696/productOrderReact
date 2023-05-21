import { createSlice } from '@reduxjs/toolkit';
import { localStorageService } from '../../utils/localStorageService';

const initialState = {
    list: [],
    cart: [...localStorageService.getCartItems()],
    totalItems: 0,
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
            console.log(state.list, action.payload);
            state.list = state.list.filter(
                (x) => x.addedItemUid !== action.payload
            );
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
            localStorageService.setCartItems(state.cart);
        },
        removeCartItem: (state, action) => {
            state.cart = state.cart.filter(
                (x) => x.addedItemUid !== action.payload
            );
            localStorageService.setCartItems(state.cart);
        },
        getItemsCountInCart: (state) => {
            console.log(localStorageService.getCartItems());
            state.totalItems = localStorageService.getCartItems()?.length;
        },
    },
});

export const {
    addProduct,
    clearProducts,
    removeProductById,
    addToCart,
    removeCartItem,
    getItemsCountInCart,
} = productSlice.actions;

export default productSlice.reducer;
