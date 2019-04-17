import React, { Component } from "react";
import modelInstance from "../../data/LyricModel";
import { Link } from "react-router-dom";
import "./AlbumDetail.css";

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      albumId: ""
    };
  }

  componentDidMount() {
    this.setState({
      albumId: this.props.albumId
    });
    modelInstance
      .getAlbumTracks(this.props.albumId)

      .then(albums => {
        const tracksResults = albums.message.body.track_list;
        this.setState({
          status: "LOADED",
          searchResult: tracksResults
        });
        if (tracksResults.length > 0) {
          const artistName = tracksResults[0].track.artist_name;
          const albumName = tracksResults[0].track.album_name;
          this.setState({
            artistName: artistName,
            albumName: albumName
          });
        }
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

  render() {
    let trackList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        trackList = <em>Loading...</em>;
        break;
      case "LOADED":
        trackList = searchResult.map(track => (
          <div
            key={track.track.lyrics_id}
            id={track.track.lyrics_id}
            className="col-md-4 track-result"
          >
            <div className="purple-gradient result-lyric">
              <Link to={"/lyric/" + track.track.track_id}>
                <div className="animate-down">
                  <h3>{this.truncate(23, track.track.track_name)}</h3>
                </div>
              </Link>
            </div>
          </div>
        ));
        break;
      default:
        trackList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <h3 className="heading2">
          Tracks from: {this.state.albumName}
          <br />
          {this.state.artistName}{" "}
        </h3>
        <div className="row">{trackList}</div>
      </div>
    );
  }
}

export default AlbumDetail;
