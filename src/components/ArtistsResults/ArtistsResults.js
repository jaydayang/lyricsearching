import React, { Component } from "react";
import modelInstance from "../../data/LyricModel";
import { Link } from "react-router-dom";

import "./ArtistsResults.css";

class ArtistsResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    const name = this.props.searchWord.q;

    modelInstance
      .searchArtist(name)

      .then(artists => {
        const artistsResults = artists.message.body.artist_list;
        this.setState({
          status: "LOADED",
          searchResult: artistsResults
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  render() {
    let artistList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        artistList = <em>Loading...</em>;
        break;
      case "LOADED":
        artistList = searchResult.map(artist => (
          <div
            key={artist.artist.artist_id}
            id={artist.artist.artist_id}
            className="col-md-6 artist-result"
          >
            <Link to={"/artist/" + artist.artist.artist_id}>
              <h3>{artist.artist.artist_name}</h3>
              <br />
            </Link>
          </div>
        ));
        break;
      default:
        artistList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <div className="row">{artistList}</div>
      </div>
    );
  }
}

export default ArtistsResults;
