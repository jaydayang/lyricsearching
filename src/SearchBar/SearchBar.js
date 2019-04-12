import React, { Component } from "react";
import "./SearchBar.css";
import { Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTypes: ["Artist", "Ablum"],
      keyword: "",
      filter: ""
    };
    this.setFilterHandler = this.setFilterHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFilterHandler(event) {
    this.setState({
      filter: event.target.value
    });
  }

  searchHandler = () => {
    this.setState({
      filter: this.state.filter,
      keyword: this.state.keyword
    });
  };

  render() {
    var searchTypesRow = this.state.searchTypes.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
    return (
      <Row>
        <select
          id="selectType"
          placeholder="filter"
          value={this.state.filter}
          onChange={this.setFilterHandler}
        >
          {searchTypesRow}
        </select>

        <input id="selectText" placeholder="Search" />

        <button
          className="btn btn-lg btn-success"
          value="Search"
          type="submit"
          onClick={() => this.searchHandler()}
        >
          Search
        </button>
      </Row>
    );
  }
}

export default SearchBar;
