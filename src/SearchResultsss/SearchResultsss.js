import React, { Component } from "react";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";
import "./SearchResultsss.css";

class SearchResultsss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount(props) {
    modelInstance
      .getAllResults(this.props.type, this.props.fliter)
      .then(results => {
        this.setState({
          status: "LOADED",
          results: results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    return <div />;
  }
}

export default SearchResultsss;
