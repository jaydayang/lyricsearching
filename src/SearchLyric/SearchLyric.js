import React, { Component } from "react";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import SearchResults from "../SearchResults/SearchResults";
import SimpleFavorite from "../SimpleFavoriteList/SimpleFavortieList";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchLyric.css";

class SearchLyric extends Component {
  handleClick() {
    this.props.action();
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    return (
      <div className="SearchLyric">
        <Container>
          <h1>Search for lyrics</h1>
          <Row>
            <Col md="8" xs="12">
              <SearchResults />
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

export default SearchLyric;
