import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import "./AlbumInfo.css";
import fire from "../Config/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class AlbumInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.parentState;


  }
  onClickItem(item) {
    modelInstance.EventEmitter.dispatch('changeItem', item);
    console.log("listen", item)
  }



  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState(nextProps.parentState);
      // your code here
      modelInstance
        .getOneTrack(this.state.lyricId)
        .then(response => response.json())
        .then(data => {
          console.log("albuminfo", data.message);
          this.setState({
            status1: "LOADED",
            track: data.message.body.track,
            idProxyAlbum: this.state.lyricId

          });
        })
        .catch(() => {
          this.setState({
            status1: "ERROR"
          });
        });



    }
    var userId = fire.auth().currentUser.uid;
    let trackId = this.state.trackId;
    let thisComponent = this;
    var saveOrNot;
    this.setState({

      idProxyAlbum: this.state.lyricId

    });
    console.log("idProxyAlbum", this.state.idProxyAlbum);


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



    //   console.log("update", this.state.lyricId)
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ lyricId: nextProps.lyricId });
  // }



  componentDidMount() {
    console.log(this.state.lyricId);
    var userId = fire.auth().currentUser.uid;
    let trackId = this.state.trackId;
    let thisComponent = this;
    var saveOrNot;
    this.setState({

      idProxyAlbum: this.state.lyricId

    });
    console.log("idProxyAlbum", this.state.idProxyAlbum);


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
          status1: "LOADED",
          track: data.message.body.track,

          // track_id: data.message.body.track.trak_id

        });
        console.log(this.state.idProxyAlbum);
      })
      .catch(() => {
        this.setState({
          status1: "ERROR"
        });
      });
  }

  // componentDidUpdate() {

  //   if (this.state.idProxyAlbum != this.state.lyricId) {
  //     console.log("update", this.state.idProxyAlbum)
  //     console.log("update", this.state.lyricId)



  //     this.setState({

  //       status1: "LOADING",

  //     });
  //     modelInstance
  //       .getOneTrack(this.state.lyricId)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log("albuminfo", data.message);
  //         this.setState({
  //           status1: "LOADED",
  //           track: data.message.body.track,
  //           idProxyAlbum: this.state.lyricId

  //         });
  //       })
  //       .catch(() => {
  //         this.setState({
  //           status1: "ERROR"
  //         });
  //       });



  //  }

  //   console.log("update", this.state.lyricId)

  // }





  onFavoriteSelect(selectedLyric) {
    modelInstance.addFavoriteLyric({ selectedLyric })
  }

  onFavoriteDeselect(selectedLyric) {
    modelInstance.removeFavoriteLyric({ selectedLyric })
  }

  favoriteLyric() {
    this.setState({ favorited: true });
    this.onFavoriteSelect(this.state.track);
    console.log("did?", this.state.favorited)
  }

  unfavoriteLyric() {
    this.setState({ favorited: false });
    this.onFavoriteDeselect(this.state.track);
    console.log("undid?", this.state.favorited)
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

  changeFavoriteProp = (like) => {
    if (like == true) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let lyricList = null;

    switch (this.state.status1) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        console.log(this.state.track);

        lyricList = (
          <div>
            <h2>{this.state.track.track_name}</h2>

            <Button onClick={() => this.onClickItem(this.changeFavoriteProp(this.state.favorited))}> {this.renderFavoriteHeart()} </Button>

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
