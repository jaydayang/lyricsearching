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

  getSubStringofName(name) {

    if (name.length > 35) {
      return name.substring(0, 35) + "...";
    } else
      return name;

  }

  render() {
    let albumList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        albumList = <em>Loading...</em>;
        break;
      case "LOADED":
        if (searchResult.length == 0) {
          albumList = <div className="ifTheresNothing"><h3 className="textH3">Oops! There's no album of this artist! :(</h3></div>
        } else {

          albumList = searchResult.map(album => (
            <div
              key={album.album.album_id}
              id={album.album.album_id}
              className="col-md-6 col-lg-4  artist-result"
            >
              <Link to={"/album/" + album.album.album_id}>
                <div className="albumBlock">
                  <h3 className="albumName">{this.getSubStringofName(album.album.album_name)}</h3>
                  <br />
                </div>
              </Link>
            </div>
          ));
        }
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
