import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import "./AlbumInfo.css";


class AlbumInfo extends Component {

  constructor(props) {
    super(props);

    this.state = this.props.parentState;
  }

  componentDidMount() {
    console.log(this.state.lyricId)

    modelInstance
      .getOneTrack(this.state.lyricId)
      .then(response => response.json())
      .then(data => {
        console.log(data.message)
        this.setState({
          status: "LOADED",
          track: data.message.body.track

        })
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let lyricList = null;


    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        console.log(this.state.track);


        lyricList = <div><h2>{this.state.track.track_name}</h2>
          <p>Artist Name:{this.state.track.artist_name}</p>
          <p>Album Name:{this.state.track.album_name}</p>
        </div>

        break;
      case "ERROR":
        lyricList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="AlbumInfo">

        {lyricList}

      </div>

    );

  }





}

export default AlbumInfo;
