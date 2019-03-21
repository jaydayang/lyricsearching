import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/LyricModel";
import SearchLyric from "./SearchLyric/SearchLyric";
import "./App.css";
import LyricDetail from "./LyricDetail/LyricDetail";
import FavoriteDetail from "./FavoriteDetail/FavoriteDetail";
import NavBar from "./NavBar/navBar";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDvPAPkBkMNwv1tsLFxdsQBFfeWVVTSQr4",
  authDomain: "whats-the-lyric.firebaseapp.com",
  databaseURL: "https://whats-the-lyric.firebaseio.com",
  projectId: "whats-the-lyric",
  storageBucket: "whats-the-lyric.appspot.com",
  messagingSenderId: "24922569831"
};
firebase.initializeApp(config);

class App extends Component {
  //constructor(props) {
  //   super(props);
  //}

  render() {
    return (
      <div className="App">
        <NavBar />
        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={Welcome} />
        <Route path="/Login" component={LoginAndRegister} />
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
