import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import "./AlbumInfo.css";
import fire from "../Config/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Button } from "reactstrap";

class AlbumInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parent: this.props.parentState,
      favorited: true
  };
}

  componentDidMount() {
    console.log(this.state.parent.lyricId);

    modelInstance
      .getOneTrack(this.state.parent.lyricId)
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        this.setState({
          status: "LOADED",
          track: data.message.body.track
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

onFavoriteSelect(selectedLyric)  {
    modelInstance.addFavoriteLyric({selectedLyric}) 
 }

onFavoriteDeselect(selectedLyric) {
     modelInstance.removeFavoriteLyric({selectedLyric}) 
 }

favoriteLyric() {
     this.setState({ favorited: true });
     this.onFavoriteSelect(this.state.favorited.track);
   }

unfavoriteLyric() {
     this.setState({ favorited: false });
     this.onFavoriteDeselect(this.state.favorited.track);
 }

renderFavoriteHeart = () => {
     //if the user is not authenticated, the fav button is not shown since we don't want them to be able to save songs
     if (fire.auth().currentUser == null)
         return '';
     //if the song is not saved as fav the heart is not colored
     if (this.state.favorited) {
       return <FontAwesomeIcon icon={['fas', 'heart']} onClick={() => this.unfavoriteLyric()} />;
     // return <FontAwesomeIcon icon="heart" onClick={() => this.unfavoriteLyric()} />;
     }
     //if the sond is the song is saved as fav the heart is colored
     return <FontAwesomeIcon icon={['far', 'heart']} onClick={() => this.favoriteLyric()} />;
   };

  render() {
    let lyricList = null;

    switch (this.state.parent.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        console.log(this.state.parent.track);

        lyricList = (
          <div>
            <h2>{this.state.parent.track.track_name}</h2>
            <Button > { this.renderFavoriteHeart() } </Button>
            <p>Artist Name:{this.state.parent.track.artist_name}</p>
            <p>Album Name:{this.state.parent.track.album_name}</p>
          </div>
        );

        break;
      case "ERROR":
        lyricList = <b>Failed to load data, please try again</b>;
        break;
      default:
        lyricList = <em>Loading...</em>;
        break;
    }
    return <div className="AlbumInfo">{lyricList}</div>;
  }
}

export default AlbumInfo;
