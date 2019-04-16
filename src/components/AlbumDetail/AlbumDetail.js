import React, { Component } from "react";
import modelInstance from "../../data/LyricModel";
import { Link } from "react-router-dom";
import "./AlbumDetail.css";

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      artistId: "26464486"
    };
  }

  componentDidMount() {
    modelInstance
      .getAlbumTracks("26464486")

      .then(albums => {
        const tracksResults = albums.message.body.track_list;
        this.setState({
          status: "LOADED",
          searchResult: tracksResults
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
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
            className="col-md-6 track-result"
          >
            <Link to={"/lyric/" + track.track.track_id}>
              <h3>{track.track.track_name}</h3>
              <br />
            </Link>
          </div>
        ));
        break;
      default:
        trackList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <div className="row">{trackList}</div>
      </div>
    );
  }
}

export default AlbumDetail;
