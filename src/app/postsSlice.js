import { createSlice } from "@reduxjs/toolkit";
const posts = JSON.parse(localStorage.getItem("posts"));

const initialState = posts ? { posts } : { posts: [] };

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setposts: (state, action) => {
      state.posts = action.payload;
    },
    addpost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletepost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    editpost: (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return (post = action.payload.value);
        }
        return post;
      });
    },
    likepost: (state, action) => {
      state.posts
        .find((post) => post._id === action.payload.postId)
        .likes.push(action.payload.data);
    },
    unlikepost: (state, action) => {
      const post = state.posts
        .find((post) => post._id === action.payload.postId)
        .likes.findIndex((like) => like._id === action.payload.likeId);
      state.posts
        .find((post) => post._id === action.payload.postId)
        .likes.splice(post, 1);
    },
    addcomment: (state, action) => {
      state.posts
        .find((post) => post._id === action.payload.postId)
        .comments.push(action.payload.data);
    },
  },
});

export const {
  setposts,
  addpost,
  deletepost,
  editpost,
  likepost,
  unlikepost,
  addcomment,
} = postsSlice.actions;
export const postsData = (state) => state.posts.posts;

export default postsSlice.reducer;
