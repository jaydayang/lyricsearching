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
    this.state = {};
  }

  render() {
    var userId = fire.auth().currentUser.uid;

    var proxy = [];

    fire
      .database()
      .ref(userId)
      .on("child_added", snapshot => proxy.push(snapshot.val().album_name));

    console.log(proxy);

    return (
      <div className="FavortieDetail">
        <h1>My favorite list</h1>
        <Container>
          <Row>
            <Col md="7" xs="12">
              <Tabs>
                <div label="Artist">{proxy}</div>
                <div label="Track">
                  On this tab, a list of the favorite tracks will be displayed
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
