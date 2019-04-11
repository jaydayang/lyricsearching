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

    // we put on state the properties we want to use and modify in the component
    this.state = {

    };
  }



  render() {

    var userId = fire.auth().currentUser.uid;

    fire.database().ref(userId).on("child_added", snapshot => console.log(snapshot.val().artist_name));
    var artist = [];
    fire.database().ref(userId).on("child_added", snapshot => { artist.push(snapshot.val().artist_name) });
    console.log(artist);

    fire.database().ref(userId).on("child_added", snapshot => console.log(snapshot.val().track_name));
    var track = [];
    fire.database().ref(userId).on("child_added", snapshot => { track.push(snapshot.val().track_name) });
    console.log(track);


    return (
      <div className="FavortieDetail">
        <h1>My favorite list</h1>
        <Container>
          <Row>
            <Col md="7" xs="12">
              <Tabs>
                <div label="Artist">
                  {/* On this tab, a list of the favorite artists will be displayed */}
                  { track }
                </div>
                <div label="Track">
                  {/* On this tab, a list of the favorite tracks will be displayed */}
                  { artist }
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