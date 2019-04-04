import React, { Component } from "react";
import SuggestionSidebar from "../../SuggestionSidebar/SuggestionSidebar";
import ArtistDetail from "../../components/ArtistDetail/ArtistDetail";
import SimpleFavorite from "../../SimpleFavoriteList/SimpleFavortieList";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ArtistDetailView.css";

class ArtistDetailView extends Component {
  handleClick() {
    this.props.action();
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    return (
      <div className="ArtistDetailView">
        <Container>
          <Row>
            <Col md="8" xs="12">
              <ArtistDetail />
            </Col>
            <Col md="4" xs="12">
              <SimpleFavorite />
              <SuggestionSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ArtistDetailView;
