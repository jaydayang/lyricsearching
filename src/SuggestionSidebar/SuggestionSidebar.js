import React, { Component } from "react";
import "./SuggestionSidebar.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance
      .getTopChart("SE", 5)
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

  render() {
    let topTrackList = [];
    const { topTracks } = this.state;

    switch (this.state.status) {
      case "LOADING":
        topTrackList = <em>.</em>;
        break;
      case "LOADED":
        topTrackList = topTracks.map(track => (
          <li
            key={track.track.commontrack_id}
            id={track.track.commontrack_id}
            className="top-track-result"
          >
            <Link to={"/lyric/" + track.track.track_id}>
              <span className="link">{track.track.track_name}</span>
              <span className="link"> Artist: {track.track.artist_name}</span>
            </Link>
          </li>
        ));
        break;
      default:
        topTrackList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="SuggestionSidebar">
        <h3 className="albumName">Top {topTrackList.length} tracks in your country</h3>
        <ul className="lyricBlock">{topTrackList}</ul>
      </div>
    );
  }
}

export default Sidebar;
