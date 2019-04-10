import React, { Component } from "react";
import fire from "../Config/Fire";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {
  //Stateless functional component
  logout() {
    fire.auth().signOut();
  }
  render() {
    var loginRegisterCont = null;
    if (fire.auth().currentUser == null) {
      this.setState = {
        isLogin: false,
        isLogout: true
      };

      loginRegisterCont = <Link to="/login">Login|Register</Link>;
    } else {
      this.setState = {
        isLogin: true,
        isLogout: false
      };
      var user = fire.auth().currentUser.email;
      console.log("asasa");
      loginRegisterCont = <button onClick={this.logout}>{user} Logout</button>;
    }

    // return (
    //   <Navbar color="light" light expand="md">
    //     <NavbarBrand href="/">Find Your Lyrics</NavbarBrand>
    //     <Nav className="ml-auto" navbar>
    //       <NavItem className="center">
    //         <SearchBar />
    //       </NavItem>

    //     </Nav>
    //   </Navbar>
    return (
      <nav className="navbar navbar-light bg-light">
        <Link className="col-sm-4" to={"/search/"}>
          LyricSearching
        </Link>
        <form>
          <div className="form-row align-items-center">
            <div className="col-sm-4 my-1">
              <label className="sr-only" htmlFor="inlineFormInputName">
                Search for:
              </label>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputName"
                placeholder="Search for:"
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
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option defaultValue value="0">
                  Lyric
                </option>
                <option value="1">Artist</option>
                <option value="2">Album</option>
              </select>
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <FontAwesomeIcon icon="heart" />
        </div>

        <NavItem>{loginRegisterCont}</NavItem>
      </nav>
    );
  }
}

export default NavBar;
