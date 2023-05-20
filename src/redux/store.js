import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice';
import { productApi } from '../apis/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer
    },

    // api slice configureStore function
    middleware: (getDefaultMiddleware) => {
     return getDefaultMiddleware().concat(productApi.middleware);
    } 
});

setupListeners(store.dispatch)