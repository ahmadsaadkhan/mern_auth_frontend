import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import { apiSlice } from './slices/ApiSlice';

const Store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;