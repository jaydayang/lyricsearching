import React, { Component } from "react";
import fire from "../Config/Fire";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import SearchBar from "../SearchBar/SearchBar";

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

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Find Your Lyrics</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="center">
            <SearchBar />
          </NavItem>

          <NavItem>{loginRegisterCont}</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
