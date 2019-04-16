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
    const name = this.props.searchWord.q;
    this.setState({
      searchWord: name
    });
    modelInstance
      .searchTrack(name)

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchWord.q !== this.props.searchWord.q) {
      const name = nextProps.searchWord.q;
      this.setState({
        searchWord: name
      });
      modelInstance
        .searchTrack(name)

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
              className="col-md-12 track-result"
            >
              <Link to={"/lyric/" + track.track.track_id}>
                <h3>{track.track.track_name}</h3>
                <span>{track.track.artist_name}</span>
                <br />
                <span>{track.track.album_name}</span>
              </Link>
            </div>
          )
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
