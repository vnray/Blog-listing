import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    const { SearchTerm, onSearchChange } = this.props;
    
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Post...."
          value={SearchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    );
  }
}

export default SearchBar;