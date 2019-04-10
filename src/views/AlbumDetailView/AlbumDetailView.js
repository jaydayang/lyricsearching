import React, { Component } from "react";
import SuggestionSidebar from "../../SuggestionSidebar/SuggestionSidebar";
import AlbumDetail from "../../components/AlbumDetail/AlbumDetail";
import SimpleFavorite from "../../SimpleFavoriteList/SimpleFavortieList";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./AlbumDetailView.css";

class AlbumDetailView extends Component {
  handleClick() {
    this.props.action();
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    return (
      <div className="AlbumDetailView">
        <Container>
          <Row>
            <Col md="8" xs="12">
              <AlbumDetail />
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

export default AlbumDetailView;
