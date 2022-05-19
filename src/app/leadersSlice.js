import { createSlice } from "@reduxjs/toolkit";
const leaders = JSON.parse(localStorage.getItem("leaders")) || [];

const initialState = leaders ? { leaders } : { leaders: [] };

export const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    setleaders: (state, action) => {
      state.leaders = action.payload;
    },
  },
});

export const { setleaders } = leadersSlice.actions;
export const leadersData = (state) => state.leaders.leaders;

export default leadersSlice.reducer;
