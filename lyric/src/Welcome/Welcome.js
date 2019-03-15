import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>Find the lyrics you like!</p>

        <Link to="/search">
          <button>Start to Explore!</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
