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

    let query = fire.database().ref(userId);
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          track.push(childData.track_name);
        });
        thisComponent.setState({
          track: track,
          status:"LOADED"
        });

      })
  }

  render() {
    let lyricList = null;
    const trackList = this.getTopChart(5);
    console.log("tracklist chart", trackList);
    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        lyricList = trackList.map(track => (
          <li
            key={track.commontrack_id}
            id={track.commontrack_id}
            className="col-md-12 top-track-result"
          >
            <Link to={"/lyric/" + track.track_id}>
              {/* <span>{track.track_name}</span> */}
              <span>{track.track_name}</span>
            </Link>
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

    // let favoriteTrack = [];
    // console.log("try track",this.state.track)
    // favoriteTrack = this.state.track.map(track => (
    //   <li
    //     key={track.commontrack_id}
    //     id={track.commontrack_id}
    //     className="col-md-12 top-track-result"
    //   >
    //     <Link to={"/lyric/" + track.track_id}>
    //       {/* <span>{track.track_name}</span> */}
    //       <span>{track.track_name}</span>
    //     </Link>
    //   </li>
    // ));

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
