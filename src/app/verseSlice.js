import { createSlice } from "@reduxjs/toolkit";
const verse = {};
// JSON.parse(localStorage.getItem("verse"));

const initialState = verse ? { verse } : { verse: {} };
const deletAfter24 = (state) => {
  localStorage.removeItem("verse");
  state.verse = {};
};

export const verseSlice = createSlice({
  name: "verse",
  initialState,
  reducers: {
    setverse: (state, action) => {
      state.verse = action.payload;
      setTimeout(deletAfter24, 86400000, state);
    },
  },
});

export const { setverse } = verseSlice.actions;
export const verseData = (state) => state?.verse?.verse;

export default verseSlice.reducer;
