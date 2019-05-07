import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

// VIEWS AND COMPONENTS
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/LyricModel";
import SearchLyric from "./SearchLyric/SearchLyric";
import SearchArtist from "./views/SearchArtist/SearchArtist";
import ArtistDetailView from "./views/ArtistDetailView/ArtistDetailView";
import AlbumDetailView from "./views/AlbumDetailView/AlbumDetailView";
import LyricDetail from "./LyricDetail/LyricDetail";
import FavoriteDetail from "./FavoriteDetail/FavoriteDetail";
import NavBar from "./NavBar/navBar";

import "./App.css";

// DATA BASE
import fire from "./Config/Fire";
import Login from "./Login/Login";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Addd all icons to the library for further use
library.add(faHeart, fas, far);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      qArtist: "artist javier",
      qLyric: "look"
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleLyricSearch = newLyric => {
    this.setState({ qLyric: newLyric });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            {/* <div className="navHeight" /> */}
            <Route path="/" component={NavBar} />

            {/* We rended diffrent component based on the path */}
            <Route exact path="/" component={Welcome} />
            {/* add login route  */}
            <Route path="/login/" render={() => <Login />} />
            {/* add login route  */}

            <Route
              path="/search/"
              render={props => (
                <SearchLyric
                  qLyric={this.state.qLyric}
                  id={props}
                  model={modelInstance}
                />
              )}
            />
            <Route
              path="/searchArtist/"
              render={props => (
                <SearchArtist
                  qArtist={this.state.qArtist}
                  id={props}
                  model={modelInstance}
                />
              )}
            />

            <Route path="/artist/:id" component={ArtistDetailView} />
            <Route
              path="/album/:id"
              render={props => (
                <AlbumDetailView id={props} model={modelInstance} />
              )}
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
      </BrowserRouter>
    );
  }
}

export default App;
