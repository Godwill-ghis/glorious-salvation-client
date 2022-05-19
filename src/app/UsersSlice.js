import { createSlice } from "@reduxjs/toolkit";
const users = JSON.parse(localStorage.getItem("users")) || [];

const initialState = users ? { users } : { users: [] };

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setusers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setusers } = usersSlice.actions;
export const usersData = (state) => state.users.users;

export default usersSlice.reducer;
