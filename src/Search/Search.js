import React, { Component } from "react";
import "./Search.css";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class Search extends Component {
  contstructor(props) {
    super(props);
    this.state = {
      searchType: ["Album", "Artist"],
      keyword: "",
      filter: ""
    };
  }

  render() {
    var searchTypesRow = this.state.searchTypes.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ));

    return (
      <Container>
        <Row>
          <Col md="8" xs="12">
            <h3>Find Your Lyrics</h3>
            <Row>
              <input id="selectText" type="text" placeholder="Search" />

              <select
                id="selectType"
                placeholder="Album"
                value={this.state.filter}
              >
                {searchTypesRow}
              </select>

              <button
                id="searchBtn"
                className="btn"
                value="Search"
                onClick={() => this.searchHandler()}
              >
                Search
              </button>
            </Row>

            <Row />
          </Col>

          <Col md="4" xs="12" />
        </Row>
      </Container>
    );
  }
}

export default Search;
