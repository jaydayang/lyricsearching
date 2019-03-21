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
      .searchTrack("love")

      .then(tracks => {
        const lyricsResults = tracks.message.body.track_list;
        console.log(lyricsResults);
        this.setState({
          status: "LOADED",
          searchResult: lyricsResults
        });
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
        lyricList = searchResult.map(
          track => (
            <div
              key={track.track.commontrack_id}
              id={track.track.commontrack_id}
              className="col-md-4 track-result"
            >
              <h3>{track.track.track_name}</h3>
              <span>{track.track.artist_name}</span>
              <span>{track.track.album_name}</span>
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
        <Link to="/detail">
          <button>Suppose this is a lyric result</button>
        </Link>
      </div>
    );
  }
}

export default SearchResults;
