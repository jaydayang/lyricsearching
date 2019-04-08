import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import { Container, Row, Col } from "reactstrap";
import Login from "../Login/Login";
import banner from "../Images/bg.jpeg";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import fire from "../Config/Fire";
import SearchBar from "../SearchBar/SearchBar";
import FadeTransition from "../Login/Transitions/fadeTransitions";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLogout: true
    };
  }

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
      <Container>
        <Row>
          <Col md="12" xs="12">
            {/* <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Find Your Lyrics</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <SearchBar />
                </NavItem>

                <NavItem>{loginRegisterCont}</NavItem>
              </Nav>
            </Navbar> */}
            <div className="bgimage">
              <img src={banner} className="banner" alt="" />
              <div className="centeredtext">
                <Link to="/search">Start to Explore!</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Welcome;
