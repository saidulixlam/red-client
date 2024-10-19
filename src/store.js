// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { redditApi } from './services/redditApi';

const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,  // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware),  // Add RTK Query middleware
});

setupListeners(store.dispatch); // This sets up refetching based on focus or reconnect

export default store;
