import React, { Component } from "react";
import "./SuggestionSidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }



  render() {
    return (
      <div className="SuggestionSidebar">
        <h3>This is the Suggestion Sidebar Component</h3>
        <ul>
          <li>Song1</li>
          <li>Song2</li>
          <li>Song3</li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
