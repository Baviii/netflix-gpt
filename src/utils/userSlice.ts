/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage if available
const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  }
  return null;
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    addUser: (state, action) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      return action.payload;
    },
    removeUser: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
