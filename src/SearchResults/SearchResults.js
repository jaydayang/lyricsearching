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

  truncate(n, useWordBoundary) {
    if (useWordBoundary.length <= n) {
      return useWordBoundary;
    }
    let subString = useWordBoundary.substr(0, n - 1);
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
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
        lyricList = searchResult.map(track => (
          <div
            key={track.track.commontrack_id}
            id={track.track.commontrack_id}
            className="col-md-4 track-result"
          >
            <Link to={"/lyric/" + track.track.track_id}>
              <div className="purple-gradient result-lyric">
                <div className="animate-down">
                  <h3>{this.truncate(23, track.track.track_name)}</h3>
                  <span className="">
                    {this.truncate(21, track.track.album_name)}
                  </span>
                </div>
                <span className="botom-pos">
                  {this.truncate(21, track.track.artist_name)}
                </span>
              </div>
            </Link>
          </div>
        ));
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
