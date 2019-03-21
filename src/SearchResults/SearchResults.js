import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import "./SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance
      .getLyrics()

      .then(response => response.json())
      .then(data => {
        this.setState({
          status: "LOADED",
          tracks: data.message.body.track_list
        })
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let lyricList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        lyricList = this.state.tracks.map(
          track => (
            <div
              key={track.track.commontrack_id}
              id={track.track.commontrack_id}
              className="col-md-4 track-result"
            >
              <Link to={"/lyric/" + track.track.track_id}>
                <h3>{track.track.track_name}</h3>
                <span>{track.track.artist_name}</span>
                <span>{track.track.album_name}</span>
              </Link>
            </div>
          )
          //<li key={track.body.track.track_id}>{track.body.track.track_id}</li>
        );
        break;
      default:
        lyricList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <div className="row">{lyricList}</div>

      </div>
    );
  }
}

export default SearchResults;