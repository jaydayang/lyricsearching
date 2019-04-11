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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, fab, fas, far);

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
        {/* //{this.state.user
          //// ? console.log(this.state.user.email + " already login")
          // : console.log("not yet login")} */}

        <header className="App-header">
          <NavBar />

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />

          {/* add login route  */}
          <Route path="/login/" render={() => <Login />} />
          {/* add login route  */}

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