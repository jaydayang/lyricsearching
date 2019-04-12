import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import "./AlbumInfo.css";
import fire from "../Config/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";

class AlbumInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.parentState

  }

  componentDidMount() {
    console.log(this.state.lyricId);
    var userId = fire.auth().currentUser.uid;
    let trackId = this.state.trackId;
    let thisComponent = this;
    var saveOrNot;

    let query = fire.database().ref(userId);
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          trackId.push(childData.track_id);
        });
        thisComponent.setState({
          trackId: trackId
        });
        console.log(thisComponent.state.lyricId);
        console.log(thisComponent.state.trackId.length);
        var id = Number(thisComponent.state.lyricId);
        var idList = thisComponent.state.trackId

        saveOrNot =
          modelInstance.savedOrNot(id, idList);
        console.log("saveOrNot", saveOrNot);

        if (saveOrNot == true) {
          thisComponent.setState({
            favorited: true
          })
        } else {
          thisComponent.setState({
            favorited: false
          })
        }
        console.log("console before", thisComponent.state.favorited)





      })

    modelInstance
      .getOneTrack(this.state.lyricId)
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


  onFavoriteSelect(selectedLyric) {
    modelInstance.addFavoriteLyric({ selectedLyric })
  }

  onFavoriteDeselect(selectedLyric) {
    modelInstance.removeFavoriteLyric({ selectedLyric })
  }

  favoriteLyric() {
    this.setState({ favorited: true });
    this.onFavoriteSelect(this.state.track);
  }

  unfavoriteLyric() {
    this.setState({ favorited: false });
    this.onFavoriteDeselect(this.state.track);
  }


  renderFavoriteHeart = () => {
    console.log("console in render", this.state.favorited)

    //if the user is not authenticated, the fav button is not shown since we don't want them to be able to save songs
    if (fire.auth().currentUser == null) { return ''; }
    //if the song is not saved as fav the heart is not colored
    else if (this.state.favorited == true) {
      return <FontAwesomeIcon icon={['fas', 'heart']} onClick={() => this.unfavoriteLyric()} />;
      // return <FontAwesomeIcon icon="heart" onClick={() => this.unfavoriteLyric()} />;
    } else {
      //if the sond is the song is saved as fav the heart is colored
      return <FontAwesomeIcon icon={['far', 'heart']} onClick={() => this.favoriteLyric()} />;
    }
  };

  render() {
    let lyricList = null;

    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        console.log(this.state.track);

        lyricList = (
          <div>
            <h2>{this.state.track.track_name}</h2>
            <Button > {this.renderFavoriteHeart()} </Button>
            <p>Artist Name:{this.state.track.artist_name}</p>
            <p>Album Name:{this.state.track.album_name}</p>
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
