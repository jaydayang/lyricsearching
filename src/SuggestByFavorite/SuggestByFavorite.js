import React, { Component } from "react";
import "./SuggestByFavorite.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {

      status: "LOADING"
    };
  }
  componentDidMount() {
    modelInstance
      .getRelatedArtists(modelInstance.mode(modelInstance.ArtistId))
      .then(response => response.json())
      .then(artist => {
        console.log('relatedArtistList', artist.message.body.artist_list);
        var suggestList = this.getPopularSongs(artist.message.body.artist_list);

        this.setState({

          status: "LOADED",
          relatedArtists: artist.message.body.artist_list,
          suggestList: suggestList


        });


      })
  }

  getPopularSongs(artistList) {
    var suggestList = new Array();

    console.log("render", artistList.length);
    for (var i = 0; i < artistList.length; i++) {
      modelInstance.getPopularSuggest(artistList[i].artist.artist_id)
        .then(response => response.json())
        .then(track => {
          suggestList.push(track.message.body.track_list[0]);
          this.setState({ status: "LOADED", })

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
