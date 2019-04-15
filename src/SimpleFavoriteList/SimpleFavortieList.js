import React, { Component } from "react";
import "./SimpleFavoriteList.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import FavoriteDetail from "../FavoriteDetail/FavoriteDetail";
import fire from "../Config/Fire";

class SimpleFavoriteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      trackFavorite: []
    };
  }

  getTopChart(num) {
    const getNum =
      num > this.state.trackFavorite.length
        ? this.state.trackFavorite.length
        : num;
    if (getNum == 0) {
      return [];
    } else {
      console.log("sliced tracks", this.state.trackFavorite.slice(0, getNum));
      return this.state.trackFavorite.slice(0, getNum);
    }
  }

  componentDidMount() {
    if (fire.auth().currentUser != null) {
      // fire.auth().onAuthStateChanged(user => {
      //   if (user) {
      console.log("fire.auth()" + fire.auth().currentUser);
      var userId = fire.auth().currentUser.uid;
      let thisComponent = this;

      let query = fire.database().ref(userId);
      query.once("value").then(function(snapshot) {
        let track = [];
        snapshot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          track.push(childData);
          console.log("name", childData);
        });

        thisComponent.setState({
          trackFavorite: track,
          status: "LOADED"
        });
      });
    } else {
      let thisComponent = this;
      thisComponent.setState({
        status: "NOLOGIN"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // fire.auth().onAuthStateChanged(user => {
    //   console.log("onauth" + user);

    // });
    // console.log("prestate.user" + prevState.user);
    // console.log("current" + this.state.user);
    // console.log("prestate suts" + prevState.status);
    // console.log("now status" + this.state.status);
    if (fire.auth().currentUser) {
      var userId = fire.auth().currentUser.uid;
      let thisComponent = this;

      let query = fire.database().ref(userId);
      query.once("value").then(function(snapshot) {
        let track = [];
        snapshot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          track.push(childData);
          console.log("name", childData);
        });

        thisComponent.setState({
          trackFavorite: track,
          status: "LOADED"
        });
      });
    }
  }

  render() {
    let lyricList = null;
    var viewOrLogin = null;
    const trackList = this.getTopChart(5);
    console.log("tracklist chart", trackList);
    switch (this.state.status) {
      case "NOLOGIN":
        lyricList = <em>Login to see favortie List Detail</em>;
        viewOrLogin = (
          <Link to="/login">
            <button className="viewallButton">Login</button>
          </Link>
        );
        break;
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        lyricList = trackList.map(track => (
          <li
            key={track.track_id}
            id={track.commontrack_id}
            className="col-md-12 top-track-result"
          >
            <Link to={"/lyric/" + track.track_id}>
              {/* <span>{track.track_name}</span> */}
              <span>{track.track_name}</span>
            </Link>
          </li>
        ));
        viewOrLogin = (
          <Link to="/favorite">
            <button className="viewallButton">View All</button>
          </Link>
        );

        break;
      case "ERROR":
        lyricList = <b>Failed to load data, please try again</b>;
        break;
      default:
        lyricList = <em>Loading...</em>;
        break;
    }

    // let favoriteTrack = [];
    // console.log("try track",this.state.track)
    // favoriteTrack = this.state.track.map(track => (
    //   <li
    //     key={track.commontrack_id}
    //     id={track.commontrack_id}
    //     className="col-md-12 top-track-result"
    //   >
    //     <Link to={"/lyric/" + track.track_id}>
    //       {/* <span>{track.track_name}</span> */}
    //       <span>{track.track_name}</span>
    //     </Link>
    //   </li>
    // ));

    return (
      <div className="SimpleFavoriteList">
        <h3>My Favorite</h3>

        <ul className="favorUl">{lyricList}</ul>
        <ul>{viewOrLogin}</ul>
        {/* <Link to="/favorite">
          <button className="viewallButton">View All</button>
        </Link> */}
      </div>
    );
  }
}

export default SimpleFavoriteList;
