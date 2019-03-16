import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import { Container, Row, Col } from "reactstrap";
import Login from "../Login/Login";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">

        <h1>Welecome with Login View</h1>
        <Container>
          <Row>

            <Col md="6" xs="12">
              <h2>Enter without login</h2>
              <Link to="/search">

                <button>Start to Explore!</button>
              </Link>
            </Col>
            <Col md="6" xs="12">
              <Login />
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default Welcome;
