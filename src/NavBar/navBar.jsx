import React, { Component } from "react";

class NavBar extends Component {
  //Stateless functional component
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          LyricSearching
        </a>
      </nav>
    );
  }
}

export default NavBar;
