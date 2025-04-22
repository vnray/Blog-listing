import React, { Component } from "react";
import { connect } from "react-redux";
import { allBlogs, blogsError, blogStatus } from "../blogs/BlogsSlice";
import FetchBlogs  from "../blogs/BlogAPI";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";

class BlogListClass extends Component {
  state = {
    searchTerm: "",
    filteredBlog: [],
  };

  componentDidMount() {
    if (this.props.status === "idle") {
      this.props.FetchBlogs(); // Dispatch action via props
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Update filtered blogs when blogs or searchTerm changes
    if (
      prevProps.blogs !== this.props.blogs ||
      prevState.searchTerm !== this.state.searchTerm
    ) {
      const filtered = this.props.blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
          blog.body.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
      this.setState({ filteredBlog: filtered });
    }
  }

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  renderContent() {
    const { status, error } = this.props;
    const { filteredBlog } = this.state;

    if (status === "loading") {
      return <Spinner />;
    } else if (status === "success") {
      return (
        <div className="blog-list">
          {filteredBlog.length > 0 ? (
            filteredBlog.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div>No blog found</div>
          )}
        </div>
      );
    } else if (status === "rejected") {
      return <div>{error}</div>;
    }
  }

  render() {
    return (
      <div className="blog-list-container">
        <div className="container">
          <h1>Blog Posts</h1>
          <SearchBar
            setSearchTerm={this.state.searchTerm}
            onSearchChange={this.handleSearchChange}
          />
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  blogs: allBlogs(state),
  status: blogStatus(state),
  error: blogsError(state),
});

// Map dispatch to props
const mapDispatchToProps = {
  FetchBlogs, // Auto-dispatches the thunk
};

// Connect to Redux
export default connect(mapStateToProps, mapDispatchToProps)(BlogListClass);