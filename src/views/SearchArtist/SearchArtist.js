import React, { Component } from "react";
import ArtistsResults from "../../components/ArtistsResults/ArtistsResults";
import SimpleFavorite from "../../SimpleFavoriteList/SimpleFavortieList";
import TopChartArtists from "../../components/TopChartArtists/TopChartArtists";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchArtist.css";
import queryString from "query-string";

class SearchArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      searchWord: "David"
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.id.location.search);
    this.setState({
      status: "LOADED",
      searchWord: query
    });
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
        artistList = <ArtistsResults searchWord={this.state.searchWord} />;
        break;
      default:
        artistList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="SearchArtist">
        <Container>
          <Row>
            <Col md="8" xs="12">
              {artistList}
            </Col>
            <Col md="4" xs="12">
              <SimpleFavorite />
              <TopChartArtists />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchArtist;
