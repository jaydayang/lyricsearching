import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import "./SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      searchWord: "happy"
    };
  }

  componentDidMount() {
    modelInstance
      .searchTrack(this.props.searchWord)

      .then(tracks => {
        const lyricsResults = tracks.message.body.track_list;
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

  //HANDLE CLICK
  //@param trackID, ID of a track
  //calls the rounter, hands the ID
  handleClick(trackID) {
    console.log("click on track", trackID.track.track.track_id);
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