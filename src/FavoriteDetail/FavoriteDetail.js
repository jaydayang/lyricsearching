import React, { Component } from "react";
import "./FavoriteDetail.css";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import { Container, Row, Col } from "reactstrap";

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


                            <ul>
                                <li>Song1</li>
                                <li>Song2</li>
                                <li>Song3</li>
                            </ul>
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
