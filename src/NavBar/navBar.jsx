import React, { Component } from "react";
import fire from "../Config/Fire";
import { Link } from "react-router-dom";
import { NavbarBrand, NavItem } from "reactstrap";
import "./NavBar.css";
import queryString from "query-string";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      select: "lyric",
      qVal: queryString.stringify({ q: " " }),
      urlTo: "search"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  //Stateless functional component
  logout() {
    fire.auth().signOut();
  }

  handleSelectChange(event) {
    let goTo = "";
    if (event.target.value === "lyric") {
      goTo = "search";
    } else if (event.target.value === "artist") {
      goTo = "searchArtist";
    }
    this.setState({
      select: event.target.value,
      urlTo: goTo
    });
  }

  handleChange(event) {
    const newWord = event.target.value;
    const searchObj = {
      q: newWord
    };
    const stringified = queryString.stringify(searchObj);
    this.setState({
      value: newWord,
      qVal: stringified
    });
  }

  handleSubmit(event) {
    const url = "/" + this.state.urlTo + "/?" + this.state.qVal;
    this.props.history.push(url);
    event.preventDefault();
  }

  render() {
    var loginRegisterCont = null;
    if (fire.auth().currentUser == null) {
      loginRegisterCont = (
        <Link to="/login" className="normalLink">
          Login|Register
        </Link>
      );
    } else {
      var user = fire.auth().currentUser.email;

      loginRegisterCont = (
        <div>
          <p className="userName">
            {"Hi!  "}
            {user}
          </p>
          <button className="logoutBtn" onClick={this.logout}>
            Logout
          </button>
        </div>
      );
    }
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <NavbarBrand className="navBrand ">
          <Link className="brandLink" to={"/"}>
            Ls
          </Link>
        </NavbarBrand>
        <form
          className=" form-inline mt-2 mt-md-0 "
          onSubmit={this.handleSubmit}
        >
          <div className="form-row  mr-auto">
            <div className=" my-1">
              <label className="sr-only" htmlFor="inlineFormInputName">
                Search for:
              </label>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputName"
                placeholder="Search for:"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto my-1">
              <label
                className="mr-sm-2 sr-only"
                htmlFor="inlineFormCustomSelect"
              >
                Preference
              </label>
              <select
                className="custom-select mr-sm-1"
                id="inlineFormCustomSelect"
                value={this.state.select}
                onChange={this.handleSelectChange}
              >
                <option value="lyric">Lyric</option>
                <option value="artist">Artist</option>
              </select>
            </div>
            <div className="col-auto my-1 ">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <NavItem className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          {loginRegisterCont}
        </NavItem>
      </nav>
    );
  }
}

export default NavBar;
