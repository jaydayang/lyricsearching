import React, { Component } from "react";
import "./SuggestByFavorite.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import fire from "../Config/Fire";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      artistId: []
    };
  }

  componentDidMount() {
    var userId = fire.auth().currentUser.uid;
    let artistId = this.state.artistId;
    let thisComponent = this;
    // fire.database().ref(userId).on("child_added", snapshot => {
    //   artistId.push(snapshot.val().artist_id)
    //   this.setState({
    //     artistId: artistId
    //   });
    // })

    let query = fire.database().ref(userId);
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          artistId.push(childData.artist_id);
        });
        thisComponent.setState({
          artistId: artistId
        });

        modelInstance
          .getRelatedArtists(modelInstance.getAppearMost(thisComponent.state.artistId))
          .then(response => response.json())
          .then(artist => {
            console.log('relatedArtistList', artist.message.body.artist_list);
            var suggestList = thisComponent.getPopularSongs(artist.message.body.artist_list);

            thisComponent.setState({

              status: "LOADED",
              relatedArtists: artist.message.body.artist_list,
              suggestList: suggestList
            });
          });
      })
>>>>>>> 6440db63a20d7c41bf19e420ed34b0b22823eccf
  }

  getPopularSongs(artistList) {
    var suggestList = new Array();

    console.log("render", artistList.length);
    for (var i = 0; i < artistList.length; i++) {
      modelInstance
        .getPopularSuggest(artistList[i].artist.artist_id)
        .then(response => response.json())
        .then(track => {
          suggestList.push(track.message.body.track_list[0]);
          this.setState({ status: "LOADED" });
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }
    console.log("rendersong", suggestList);
    console.log("rendersong2", suggestList.length);
    return suggestList;
  }

  render() {
    let suggestList1 = [];
    console.log(this.state.artistId);

    console.log(this.state.artistId.length);

    switch (this.state.status) {
      case "LOADING":
        suggestList1 = <em>loading</em>;
        break;
      case "LOADED":
        console.log("loaded", this.state.relatedArtists);
        console.log("suggestlist", this.state.suggestList);

        suggestList1 = this.state.suggestList.map(track => (
          <li
            key={track.track.commontrack_id}
            id={track.track.commontrack_id}
            className="col-md-12 top-track-result"
          >
            <Link to={"/lyric/" + track.track.track_id}>
              <span>{track.track.track_name}</span>
              <span> Artist: {track.track.artist_name}</span>
            </Link>
          </li>
        ));

        // suggestList = this.state.suggestList.map(track => (
        //   <li
        //     key={track.track.commontrack_id}
        //     id={track.track.commontrack_id}
        //     className="col-md-12 top-track-result"
        //   >
        //     <Link to={"/lyric/" + track.track.commontrack_id}>
        //       <span>{track.track.track_name}</span>
        //       <span> Artist: {track.track.artist_name}</span>
        //     </Link>
        //   </li>
        // ));
        break;
      default:
        suggestList1 = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="SuggestByFavorite">
        <h3>{suggestList1.length} tracks you may like</h3>
        <ul>{suggestList1}</ul>
      </div>
    );
  }

  // componentDidMount() {

  //   var suggestList = [];

  //Get the related artist list based on the artist appears most in the faviorite list

  //   modelInstance
  //     .getRelatedArtists(modelInstance.mode(modelInstance.ArtistId))
  //     .then(response => response.json())
  //     .then(artist => {
  //       console.log('relatedArtistList', artist.message.body.artist_list);
  //       this.setState({

  //         status: "LOADED",
  //         relatedArtists: artist.message.body.artist_list,

  //       });

  //     })

  //     .catch(() => {
  //       this.setState({
  //         status: "ERROR"
  //       });
  //     });

  // }

  // getRelatedArtist() {
  //   let artistIdList = [];
  //   switch (this.state.suggestStatus) {
  //     case "LOADED":
  //       console.log("render", this.state.relatedArtists.length);
  //       for (var i = 0; i < this.state.relatedArtists.length; i++) {
  //         artistIdList.push(this.state.relatedArtists[i].artist.artist_id);
  //       }

  //       break;

  //     default:
  //       console.log("no");
  //       break;
  //   }
  //   return artistIdList;

  // }

  // getPopularSongs() {
  //   let suggestList = [];

  //   console.log("render", this.state.relatedArtists.length);
  //   for (var i = 0; i < this.state.relatedArtists.length; i++) {
  //     modelInstance.getPopularSuggest(this.state.relatedArtists[i].artist.artist_id)
  //       .then(response => response.json())
  //       .then(track => {
  //         suggestList.push(track.message.body.track_list[0])

  //       })
  //       .catch(() => {
  //         this.setState({
  //           status: "ERROR"
  //         });
  //       });
  //   }
  //   console.log("rendersong", suggestList);
  //   return suggestList;

  // }

  // render() {
  //   let topTrackList = [];

  //   // console.log(this.getRelatedArtist());

  //   switch (this.state.status) {
  //     case "LOADING":
  //       topTrackList = <em>.</em>;
  //       console.log(this.state.relatedArtists)
  //       break;
  //     case "LOADED":

  //       console.log(this.state.relatedArtists)

  //       // for (var i = 0; i < proxy.length; i++) {
  //       //   console.log(proxy[i]);
  //       //   topTrackList +=
  //       //     <li className="favorLi" key={proxy[i].track.track_id}>
  //       //       {proxy[i].track.track_name}
  //       //     </li>

  //       // }

  //       // // topTrackList = proxy.map(track => (
  //       //   <li
  //       //     key={track.track.commontrack_id}
  //       //     id={track.track.commontrack_id}
  //       //     className="col-md-12 top-track-result"
  //       //   >
  //       //     <Link to={"/lyric/" + track.track.commontrack_id}>
  //       //       <span>{track.track.track_name}</span>
  //       //       <span> Artist: {track.track.artist_name}</span>
  //       //     </Link>
  //       //   </li>
  //       // ));
  //       console.log(topTrackList)

  //       break;
  //     default:
  //       topTrackList = <b>Failed to load data, please try again</b>;
  //       break;
  //   }

  //   return (
  //     <div className="SuggestionSidebar">
  //       <h3>Top {topTrackList.length} tracks</h3>
  //       <ul>{topTrackList}</ul>
  //     </div>
  //   );
  // }
}

export default Sidebar;
