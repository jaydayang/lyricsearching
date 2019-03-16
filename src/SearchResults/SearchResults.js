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

      .then(tracks => {
        console.log(tracks)

        this.setState({

          status: "LOADED",
          tracks: tracks.results
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


    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        lyricList = this.state.tracks.map(track => (

          <li key={track.body.track.track_id}>{track.body.track.track_id}</li>
        ));
        break;
      default:
        lyricList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching Results">
        <h2>This is the search results component</h2>
        <h3>Searching Results</h3>
        <ul>{lyricList}</ul>
        <Link to="/detail">

          <button>Suppose this is a lyric result</button>
        </Link>
      </div>
    );
  }
}

export default SearchResults;
