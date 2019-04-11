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
      tracks: {}
    };
  }

  // componentDidMount() {
  //   var userId = fire.auth().currentUser.uid;

  //   fire
  //     .database()
  //     .ref(userId)
  //     .on("child_added", snapshot => {
  //       this.state.tracks.push(snapshot.val());
  //     });

  //   this.setState({
  //     tracks
  //   });
  // }

  render() {
    // var trackitem = this.state.tracks.map(track => <div>{track}</div>);

    // console.log(this.state.tracks);
    // console.log(trackitem);

    //console.log(trackitem);

    // var index;
    // fire.database().ref(userId).on("child_added", snapshot =>
    //   index = snapshot.val().album_name
    // ).then(
    //   console.log(index)
    // );

    return (
      <div className="FavortieDetail">
        <h1>My favorite list</h1>
        <Container>
          <Row>
            <Col md="7" xs="12">
              <Tabs>
                <div label="Artist" />
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
