import React, { Component } from "react";
import { Link } from "react-router-dom";
import { imageMap } from "../blogs/imageData";

class BlogCard extends Component {
  render() {
    const { blog } = this.props;
    const imgURL = imageMap[`${blog.id}`];
    
    return (
      <Link to={`/blog/${blog.id}`} className="read-more">
        <div className="blog-card">
          <div className="blog-thumbnail">
            <img src={imgURL} alt="blog thumbnails" />
          </div>
          <div className="blog-content">
            <h3>{blog.title}</h3>
            <p>{blog.body.substring(0, 100)}...</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default BlogCard;