import React, { Component } from "react";
import "./FavoriteDetail.css";
import SuggestionSidebar from "../SuggestByFavorite/SuggestByFavorite";
import { Container, Row, Col } from "reactstrap";
import Tabs from "./Tabs/Tabs";
import { Link } from "react-router-dom";
import fire from "../Config/Fire";

class FavoriteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      artist: [],
      track: []
    };
  }

  componentDidMount() {
    if (fire.auth().currentUser != null) {
      var userId = fire.auth().currentUser.uid;
      let artist = this.state.artist;
      fire
        .database()
        .ref(userId)
        .on("child_added", snapshot => {
          artist.push(snapshot.val());
          this.setState({
            artist
          });
        });

      let track = this.state.track;
      fire
        .database()
        .ref(userId)
        .on("child_added", snapshot => {
          track.push(snapshot.val());
          this.setState({
            track
          });
        });
    }
  }

  render() {
    let favoriteArtist = [];
    favoriteArtist = this.state.artist.map(track => (
      <li
        key={track.commontrack_id}
        id={track.commontrack_id}
        className="col-md-12 top-track-result"
      >
        <Link to={"/lyric/" + track.track_id} className="link">
          <span>{track.artist_name}</span>
        </Link>
      </li>
    ));

    let favoriteTrack = [];
    favoriteTrack = this.state.track.map(track => (
      <li
        key={track.commontrack_id}
        id={track.commontrack_id}
        className="col-md-12 top-track-result"
      >
        <Link to={"/lyric/" + track.track_id} className="link">
          <span>{track.track_name}</span>
        </Link>
      </li>
    ));

    return (
      <div className="FavortieDetail">
      <br/>
        <h1 className="albumName">My favorite list</h1>
        <Container>
          <Row>
            <Col md="7" xs="12">
              <Tabs>
                <div label="Artist">
                  <div className="lyricBlock">{favoriteArtist}</div>
                </div>
                <div label="Track">
                  <div className="lyricBlock">{favoriteTrack}</div>
                </div>
              </Tabs>
            </Col>
            <Col md="5" xs="12">
              <SuggestionSidebar />
              <Link to="/search">
                <button className="viewallButton">Back to search</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FavoriteDetail;
