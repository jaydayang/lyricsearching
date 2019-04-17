import React, { Component } from "react";
import "./SimpleFavoriteList.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import fire from "../Config/Fire";

class SimpleFavoriteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      trackFavorite: [],
      user: fire.auth().currentUser
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
      return this.state.trackFavorite.slice(0, getNum);
    }
  }

  componentDidMount() {
    var self = this;

    modelInstance.EventEmitter.subscribe("changeItem", function(newItem) {
      self.setState({
        curItem: newItem
      });
    });

    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        var userId = fire.auth().currentUser.uid;
        let thisComponent = self;
        let query = fire.database().ref(userId);

        query.once("value").then(function(snapshot) {
          let track = [];
          snapshot.forEach(function(childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            track.push(childData);
          });

          thisComponent.setState({
            trackFavorite: track,
            status: "LOADED"
          });
        });
      } else {
        self.setState({
          status: "NOLOGIN"
        });
      }
    });
  }

  componentWillMount() {
    modelInstance.EventEmitter.unSubscribe("changeItem");
  }

  componentDidUpdate(prevProps) {
    if (fire.auth().currentUser != null) {
      var userId = fire.auth().currentUser.uid;
      let thisComponent = this;

      let query = fire.database().ref(userId);
      query.once("value").then(function(snapshot) {
        let track = [];
        snapshot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          track.push(childData);
        });
        console.log(
          "true or false",
          track.length != thisComponent.state.trackFavorite.length
        );
        if (track.length != thisComponent.state.trackFavorite.length) {
          thisComponent.setState({
            trackFavorite: track,
            status: "LOADED"
          });
        }
      });
    }
  }

  render() {
    let lyricList = null;
    var viewOrLogin = null;
    const trackList = this.getTopChart(5);
    switch (this.state.status) {
      case "NOLOGIN":
        lyricList = <em>Login to see favorite List Detail</em>;
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
              <span className="link">{track.track_name}</span>
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

    return (
      <div className="SimpleFavoriteList">
        <h3 className="albumName">My Favorites</h3>
        <ul className="lyricBlock">{lyricList}</ul>
        <ul>{viewOrLogin}</ul>
      </div>
    );
  }
}

export default SimpleFavoriteList;
