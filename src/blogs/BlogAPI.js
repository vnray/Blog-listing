import { createAsyncThunk } from "@reduxjs/toolkit";

const FetchBlogs = createAsyncThunk("blogs/fetchblogs", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  const data = await response.json();
  return data;
});

export default FetchBlogs;
