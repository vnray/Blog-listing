import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FetchBlogs from "../blogs/BlogAPI";
import { allBlogs, blogStatus } from "../blogs/BlogsSlice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { imageMap } from "../blogs/imageData";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(blogStatus);
  const blogs = useSelector(allBlogs);
  console.log(id);
  useEffect(() => {
    if (status === "idle") {
      FetchBlogs();
    }
  }, [status, dispatch]);

  const blog = blogs.find((blog) => {
    return blog.id === parseInt(id);
  });
  if (status === "idle") return <Spinner />;
  if (!blog) return <div>blog post not found</div>;

  const imgURL = imageMap[`${blog.id}`];
  return (
    <div className="blog-detail-container">
      <div className="container">
        <div className="blog-detail">
          <h2>{blog.title}</h2>
          <div className="blog-image">
            <img src={imgURL} alt="blog-image" />
          </div>
          <p>{blog.body}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
