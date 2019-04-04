import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import { Container, Row, Col } from "reactstrap";
import Login from "../Login/Login";
import banner from "../Images/bg.jpeg";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import fire from "../Config/Fire";

class Welcome extends Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="12" xs="12">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Find Your Lyrics</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/Login">Login/Resigter</NavLink>
                </NavItem>
                <button onClick={this.logout}>Logout</button>
              </Nav>
            </Navbar>
            <div className="bgimage">
              <img src={banner} className="banner" alt="" />
              <div className="centeredtext">
                <Link to="/search">Start to Explore!</Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Login />
        </Row>
      </Container>
    );
  }
}

export default Welcome;
