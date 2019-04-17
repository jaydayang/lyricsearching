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
          searchResult: artistsResults,
          searchWord: name
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
  }

  getSubStringofName(name) {
    if (name.length > 35) {
      return name.substring(0, 35) + "...";
    } else return name;
  }

  render() {
    let artistList = null;
    const { searchResult } = this.state;

    switch (this.state.status) {
      case "LOADING":
        artistList = <em>Loading...</em>;
        break;
      case "LOADED":
        if (searchResult.length == 0) {
          artistList = (
            <div className="ifTheresNothing">
              <h3 className="textH3">Oops! There's no artist of this word!</h3>
            </div>
          );
        } else {
          artistList = searchResult.map(artist => (
            <div
              key={artist.artist.artist_id}
              id={artist.artist.artist_id}
              className="col-md-6 col-lg-4 artist-result"
            >
              <Link to={"/artist/" + artist.artist.artist_id}>
                <div className="artistBlock">
                  <h3 className="textH3">
                    {this.getSubStringofName(artist.artist.artist_name)}
                  </h3>
                  <br />
                </div>
              </Link>
            </div>
          ));
        }

        break;
      default:
        artistList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Searching-Results">
        <h2>Search artists named: {this.state.searchWord}</h2>
        <div className="row">{artistList}</div>
      </div>
    );
  }
}

export default ArtistsResults;
