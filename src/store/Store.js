import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../blogs/BlogsSlice";

export const Store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },

});
