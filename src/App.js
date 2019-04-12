import React, { Component } from "react";
import { Route } from "react-router-dom";

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
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
    console.log("im in in app js in source");
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        this.setState({ user });
        //get user' uid ////////////////
        console.log("get user's uid" + fire.auth().currentUser.uid);
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />

          {/* add login route  */}
          <Route path="/login/" render={() => <Login />} />
          {/* add login route  */}

          <Route
            path="/search/"
            render={props => <SearchLyric id={props} model={modelInstance} />}
          />
          <Route
            path="/searchArtist/"
            render={props => <SearchArtist id={props} model={modelInstance} />}
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
