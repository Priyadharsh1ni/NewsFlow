import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // Make sure you have an index.js in reducers folder exporting combineReducers

const store = configureStore({
    reducer: rootReducer,
});

export default store;