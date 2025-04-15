import { useState, useEffect } from "react";
import { allBlogs, blogsError, blogStatus } from "../blogs/BlogsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import FetchBlogs from "../blogs/BlogAPI";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(allBlogs);
  const status = useSelector(blogStatus);
  const error = useSelector(blogsError);
  const [SearchTerm, setSearchTerm] = useState("");
  const [filteredBlog, setFilteredBlog] = useState([]);

  useEffect(() => {
    if (status == "idle") {
      dispatch(FetchBlogs());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (blogs.length > 0) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          blog.body.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredBlog(filtered);
    }
  }, [blogs, SearchTerm]);

  let content;
  if (status === "loading") {
    content = <Spinner />;
  } else if (status === "success") {
    content = (
      <div className="blog-list">
        {filteredBlog.length > 0 ? (
          filteredBlog.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div> No blog Found</div>
        )}
      </div>
    );
  } else if (status === "rejected") {
    content = <div>{error}</div>;
  }

  return (
    <div className="blog-list-container">
      <div className="container">
        <h1>Blog Posts</h1>
        <SearchBar setSearchTerm={SearchTerm} onSearchChange={setSearchTerm} />
        {content}
      </div>
    </div>
  );
};

export default BlogList;
