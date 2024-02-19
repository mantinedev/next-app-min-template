"use client";
// import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
// import { UserState, userReducer } from "./userSlice";

// interface RootState {
//     user: Reducer<UserState>;
//   }
  
//   // Combine reducers
//   const rootReducer = combineReducers<RootState>({
//     user: userReducer,
//   });
  
//   // Create Redux store
//   const store = configureStore({
//     reducer: rootReducer,
//   });
  
//   export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { UserState, userReducer } from "./userSlice";

// Define the root state interface
interface RootState {
  user: UserState;
}

// Combine reducers
const rootReducer = combineReducers<RootState>({
  user: userReducer,
});

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
