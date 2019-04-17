import React, { Component } from "react";
import "./SuggestByFavorite.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import fire from "../Config/Fire";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      artistId: []
    };
  }

  componentDidMount() {
    if (fire.auth().currentUser != null) {
      var userId = fire.auth().currentUser.uid;
      let artistId = this.state.artistId;
      let thisComponent = this;

      let query = fire.database().ref(userId);
      query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          artistId.push(childData.artist_id);
        });

        thisComponent.setState({
          artistId: artistId
        });

        modelInstance
          .getRelatedArtists(
            modelInstance.getAppearMost(thisComponent.state.artistId)
          )
          .then(response => response.json())
          .then(artist => {
            var suggestList = thisComponent.getPopularSongs(
              artist.message.body.artist_list
            );

            thisComponent.setState({
              status: "LOADED",
              relatedArtists: artist.message.body.artist_list,
              suggestList: suggestList
            });
          });
      });
    }
  }

  getPopularSongs(artistList) {
    var suggestList = new Array();
    if (artistList != null) {
      for (var i = 0; i < artistList.length; i++) {
        modelInstance
          .getPopularSuggest(artistList[i].artist.artist_id)
          .then(response => response.json())
          .then(track => {
            suggestList.push(track.message.body.track_list[0]);
            this.setState({ status: "LOADED" });
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          });
      }
    } else {
      modelInstance
        .getRandomSuggest("SE", 5)
        .then(track => {
          for (let i = 0; i < 5; i++) {
            suggestList.push(track.message.body.track_list[i]);
          }

          this.setState({ status: "LOADED" });
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }
    return suggestList;
  }

  render() {
    let suggestList1 = [];

    switch (this.state.status) {
      case "LOADING":
        suggestList1 = <em>loading</em>;
        break;
      case "LOADED":

        suggestList1 = this.state.suggestList.map(track => (
          <li
            key={track.track.commontrack_id}
            id={track.track.commontrack_id}
            className="col-md-12 top-track-result"
          >
            <Link to={"/lyric/" + track.track.track_id}>
              <span className="link">{track.track.track_name}</span>
              <span className="link"> Artist: {track.track.artist_name}</span>
            </Link>
          </li>
        ));

        break;
      default:
        suggestList1 = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="SuggestByFavorite">
        <h3 className="albumName">{suggestList1.length} tracks you may like</h3>
        <ul className="lyricBlock">{suggestList1}</ul>
      </div>
    );
  }
}

export default Sidebar;
