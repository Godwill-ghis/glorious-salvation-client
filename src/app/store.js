import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsSlice from "./postsSlice";
import prayerSlice from "./prayerSlice";
import verseSlice from "./verseSlice";
import leadersSlice from "./leadersSlice";
import usersSlice from "./UsersSlice";
import messagesSlice from "./messageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsSlice,
    prayer: prayerSlice,
    verse: verseSlice,
    leaders: leadersSlice,
    users: usersSlice,
    messages: messagesSlice,
  },
});
