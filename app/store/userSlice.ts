"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Utils/user";

//-- Define the initial state interface ---------------------------------------
export interface UserState {
  userData: User[];
}

//-- Define the initial state ------------------------------------------------
const initialState: UserState = {
  userData: [],
};

//-- Create the user slice ---------------------------------------------------
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer for fetching users
    fetchUser(state, action: PayloadAction<User[]>) {
      state.userData = action.payload;
    },
    // Reducer for removing a user
    removeUser(state, action: PayloadAction<string>) {
      state.userData = state.userData.filter(user => user.username !== action.payload);
    } 
  }
});

//-- Export the actions and reducer ------------------------------------------
export const { removeUser, fetchUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

