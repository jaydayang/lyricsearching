import React, { Component } from "react";
import "./LyricDetail.css";
import { Container, Row, Col, Button } from "reactstrap";
import AlbumInfo from "../AlbumInfo/AlbumInfo";


class LyricDetail extends Component {
    render() {
        return (
            <div className="LyricDetail">

                <h1>Lyric Detail View</h1>
                <Container>
                    <Row>

                        <Col md="6" xs="12">
                            <AlbumInfo />
                        </Col>

                    </Row>
                </Container>
                <Container>
                    <Row>

                        <Col md="6" xs="12">
                            <h2>2.Lyrics</h2>
                            <p>Song Title: Happy Birthday</p>
                            <p>Happy birthday to you</p>
                            <p>Happy birthday to you</p>
                            <p>Happy birthday to you</p>
                            <p>Happy birthday to you</p>

                        </Col>
                        <Col md="6" xs="12">
                            <p><Button>Add to Favorite</Button></p>
                            <p>
                                <Button>Translate</Button></p>

                        </Col>

                    </Row>
                </Container>
            </div>

        );
    }
}

export default LyricDetail;
