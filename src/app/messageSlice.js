import { createSlice } from "@reduxjs/toolkit";
const messages = JSON.parse(localStorage.getItem("messages")) || [];

const initialState = messages ? { messages } : { messages: [] };

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setmessages: (state, action) => {
      state.messages = action.payload;
    },
    addmessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setmessages, addmessage } = messagesSlice.actions;
export const messagesData = (state) => state.messages.messages;

export default messagesSlice.reducer;
