import React, { Component } from "react";
import "./FavoriteDetail.css";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import { Container, Row, Col } from "reactstrap";
import Tabs from './Tabs/Tabs';

class FavoriteDetail extends Component {
    constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {

        };
    }



    render() {
        return (
            <div className="FavortieDetail">
                <h1>My favorite list</h1>
                <Container>
                    <Row>

                        <Col md="7" xs="12">


                        <Tabs>
                            <div label="Artist">
                            On this tab, a list of the favorite artists will be displayed
                            </div>
                            <div label="Track">
                            On this tab, a list of the favorite tracks will be displayed
                            </div>
                        </Tabs>
                        </Col>
                        <Col md="5" xs="12">
                            <SuggestionSidebar />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FavoriteDetail;


/*
import React from 'react';
import { render } from "react-dom";

import Tabs from './Tabs';

require('./styles.css');

function App() {
  return (
    <div>
      <h1>Tabs Demo</h1>
      <Tabs>
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After &apos;while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
render(<App />, container);
*/