import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import fire from "../Config/Fire";
import modelInstance from "../data/LyricModel";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLogout: true,
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance
      .getTopChart("SE", 25)
      .then(tracks => {
        const tracksResult = tracks.message.body.track_list;
        this.setState({
          status: "LOADED",
          topTracks: tracksResult
        });
      })

      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    let topTrackList = [];
    const { topTracks } = this.state;
    switch (this.state.status) {
      case "LOADING":
        topTrackList = <em>.</em>;
        break;
      case "LOADED":
        topTrackList = topTracks.map(track => (
          <Link className="bg-link" to={"/lyric/" + track.track.track_id}
            key={track.track.commontrack_id}
            id={track.track.commontrack_id}
          >
            <span>
              {track.track.track_name} {track.track.artist_name} -
            </span>
          </Link>
        ));
        break;
      default:
        topTrackList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="jumbotron g-orange full-width">
        <div className="container-fluid p-none">
          <div>{topTrackList}</div>
        </div>
      </div>
    );
  }
}

export default Welcome;
