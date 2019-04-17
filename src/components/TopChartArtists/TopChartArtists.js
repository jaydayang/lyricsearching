import React, { Component } from "react";
import "./TopChartArtists.css";
import modelInstance from "../../data/LyricModel";
import { Link } from "react-router-dom";

class TopChartArtists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance
      .getTopChartArtist("SE", 5)
      .then(artists => {
        const artistsResult = artists.message.body.artist_list;
        this.setState({
          status: "LOADED",
          topArtists: artistsResult
        });
      })

      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let topArtistList = [];
    const { topArtists } = this.state;

    switch (this.state.status) {
      case "LOADING":
        topArtistList = <em>.</em>;
        break;
      case "LOADED":
        topArtistList = topArtists.map(artist => (
          <li
            key={artist.artist.artist_id}
            id={artist.artist.artist_id}
            className="col-md-12 top-artist-result"
          >
            <Link to={"/artist/" + artist.artist.artist_id}>
              <span className="link">{artist.artist.artist_name}</span>
            </Link>
          </li>
        ));
        break;
      default:
        topArtistList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="TopChartArtists">
        <h3 className="albumName">Top {topArtistList.length} artists in your country</h3>
        <ul className="lyricBlock">{topArtistList}</ul>
      </div>
    );
  }
}

export default TopChartArtists;
