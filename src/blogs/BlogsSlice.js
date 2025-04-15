import { createSlice } from "@reduxjs/toolkit";
import FetchBlogs from "./BlogAPI";

const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    status: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(FetchBlogs.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default BlogsSlice.reducer;

export const allBlogs = (state) => state.blogs.items;
export const blogStatus = (state) => state.blogs.status;
export const blogsError = (state) => state.blogs.error;
