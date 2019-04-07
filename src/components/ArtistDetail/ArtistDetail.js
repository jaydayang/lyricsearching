import React, { Component } from "react";
import modelInstance from "../../data/LyricModel";
import { Link } from "react-router-dom";
import "./ArtistDetail.css";

class ArtistDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance
      .getArtistAlbums(this.props.artistId)

      .then(albums => {
        const albumsResults = albums.message.body.album_list;
        this.setState({
          status: "LOADED",
          searchResult: albumsResults
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  render() {
    let albumList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        albumList = <em>Loading...</em>;
        break;
      case "LOADED":
        albumList = searchResult.map(album => (
          <div
            key={album.album.album_id}
            id={album.album.album_id}
            className="col-md-6 artist-result"
          >
            <Link to={"/album/" + album.album.album_id}>
              <h3>{album.album.album_name}</h3>
              <br />
            </Link>
          </div>
        ));
        break;
      default:
        albumList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <div className="row">{albumList}</div>
      </div>
    );
  }
}

export default ArtistDetail;
