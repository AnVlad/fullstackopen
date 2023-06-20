import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const { setBlogs, addBlog, deleteBlog, updateBlog } =
  blogsReducer.actions;
export default blogsReducer.reducer;
