import { createSlice } from "@reduxjs/toolkit";
const prayer = JSON.parse(localStorage.getItem("prayer")) || {};

const initialState = prayer ? { prayer } : { prayer: {} };
const deletAfter24 = (state) => {
  localStorage.removeItem("prayer");
  state.prayer = {};
};

export const prayerSlice = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    setprayer: (state, action) => {
      state.prayer = action.payload;
      setTimeout(deletAfter24, 86400000, state);
    },
  },
});

export const { setprayer } = prayerSlice.actions;
export const prayerData = (state) => state.prayer.prayer;

export default prayerSlice.reducer;
