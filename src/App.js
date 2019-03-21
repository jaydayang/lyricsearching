import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/LyricModel";
import SearchLyric from "./SearchLyric/SearchLyric";
import "./App.css";
import LyricDetail from "./LyricDetail/LyricDetail";
import FavoriteDetail from "./FavoriteDetail/FavoriteDetail";
import NavBar from "./NavBar/navBar";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={Welcome} />
        <Route
          path="/search"
          render={() => <SearchLyric model={modelInstance} />}
        />
        <Route
          path="/detail"
          render={() => <LyricDetail model={modelInstance} />}
        />
        <Route
          path="/favorite"
          render={() => <FavoriteDetail model={modelInstance} />}
        />
      </div>
    );
  }
}

export default App;
