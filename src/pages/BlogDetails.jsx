import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FetchBlogs from "../blogs/BlogAPI";
import { allBlogs, blogStatus } from "../blogs/BlogsSlice";
import Spinner from "../components/Spinner";
import { imageMap } from "../blogs/imageData";

class BlogDetailsClass extends Component {
  componentDidMount() {
    if (this.props.status === "idle") {
      this.props.FetchBlogs();
    }
  }

  render() {
    const { status, blogs, match } = this.props;
    const { id } = match.params;
    const blog = blogs.find(blog => blog.id === parseInt(id));

    if (status === "idle") return <Spinner />;
    if (!blog) return <div>Blog post not found</div>;

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
  }
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  blogs: allBlogs(state),
  status: blogStatus(state)
});

// Map dispatch to props
const mapDispatchToProps = {
  FetchBlogs
};

// withRouter gives access to route params via this.props.match
// connect links the component to Redux
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogDetailsClass)
);