import React, { Component } from "react";
import "./SimpleFavoriteList.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import FavoriteDetail from "../FavoriteDetail/FavoriteDetail";
import fire from "../Config/Fire";

class SimpleFavoriteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      track: []
    };
  }

  getTopChart(num){
    const getNum = num > this.state.track.length? this.state.track.length: num; 
    if(getNum == 0){
      return '';
    }else{
      console.log("sliced tracks",this.state.track.slice(0, getNum-1));
      return this.state.track.slice(0, getNum-1);
    }
    
  }

  componentDidMount() {
    var userId = fire.auth().currentUser.uid;
    let thisComponent = this;
    let track = this.state.track;
    fire.database().ref(userId).on("child_added", snapshot => {
      track.push(snapshot.val())
      this.setState({
        track
      });
      //thisComponent.getTopChart(5);
    })

    modelInstance
      .getTopChart(5)
      .then(response => response.json())
      .then(data => {
        this.setState({
          status: "LOADED",
          tracks: this.state.track
        });
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
        lyricList = this.state.track.map(song => (
          <li className="favorLi" key={song.track.track_id}>
            {song.track.track_name}
          </li>
        ));

        break;
      case "ERROR":
        lyricList = <b>Failed to load data, please try again</b>;
        break;
      default:
        lyricList = <em>Loading...</em>;
        break;
    }


    return (
      <div className="SimpleFavoriteList">
        <h3>My Favorite</h3>

        <ul className="favorUl">{lyricList}</ul>
        <Link to="/favorite">
          <button className="viewallButton">View All</button>
        </Link>
      </div>
    );
  }
}

export default SimpleFavoriteList;
