import React, { Component } from "react";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import SearchResults from "../SearchResults/SearchResults";
import SimpleFavorite from "../SimpleFavoriteList/SimpleFavortieList";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchLyric.css";
import queryString from "query-string";

class SearchLyric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      searchWord: { q: "" }
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.id.location.search);
    this.setState({
      status: "LOADED",
      searchWord: query
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id.location.search !== this.props.id.location.search) {
      const searchQuery = queryString.parse(nextProps.id.location.search);
      this.setState({
        searchWord: searchQuery
      });
    }
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    let artistList = null;
    switch (this.state.status) {
      case "LOADING":
        artistList = <em>Loading...</em>;
        break;
      case "LOADED":
        artistList = <SearchResults searchWord={this.state.searchWord} />;
        break;
      default:
        artistList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="SearchLyric">
        <Container>
          <Row>
            <Col md="8" xs="12">
              {artistList}
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
