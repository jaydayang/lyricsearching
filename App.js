import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/LyricModel";
import SearchLyric from "./SearchLyric/SearchLyric";
import SearchArtist from "./views/SearchArtist/SearchArtist";
import ArtistDetailView from "./views/ArtistDetailView/ArtistDetailView";
import AlbumDetailView from "./views/AlbumDetailView/AlbumDetailView";
import LyricDetail from "./LyricDetail/LyricDetail";
import FavoriteDetail from "./FavoriteDetail/FavoriteDetail";

import "./App.css";
import NavBar from "./NavBar/navBar";
import fire from "./Config/Fire";
import Login from "./Login/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user
          ? console.log(this.state.user.email + " already login")
          : console.log("not yet login")}

        <header className="App-header">
          <NavBar />

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route path="/login/" render={() => <Login />} />
          <Route
            path="/search/"
            render={() => <SearchLyric model={modelInstance} />}
          />
          <Route
            path="/searchArtist/"
            render={() => <SearchArtist model={modelInstance} />}
          />
          <Route path="/artist/:id" component={ArtistDetailView} />
          <Route
            path="/album/:id"
            render={() => <AlbumDetailView model={modelInstance} />}
          />
          <Route
            path="/favorite"
            render={() => <FavoriteDetail model={modelInstance} />}
          />
          <Route
            path="/lyric/:id"
            render={props => <LyricDetail id={props} model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;