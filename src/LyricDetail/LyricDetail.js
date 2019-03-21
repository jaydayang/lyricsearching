import React, { Component } from "react";
import "./LyricDetail.css";
import modelInstance from "../data/LyricModel";
import { Container, Row, Col, Button } from "reactstrap";
import AlbumInfo from "../AlbumInfo/AlbumInfo";



class LyricDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING",
            lyricId: this.props.id.match.params.id
        };
    }

    componentDidMount() {
        console.log(this.state.lyricId)

        modelInstance
            .getOneLyric(this.state.lyricId)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                this.setState({
                    status: "LOADED",
                    lyric: data.message.body.lyrics

                })
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
    }

    render() {
        let lyricList = null;


        switch (this.state.status) {
            case "LOADING":
                lyricList = <em>Loading...</em>;
                break;
            case "LOADED":
                console.log(this.state.lyric);


                lyricList = <p>{this.state.lyric.lyrics_body}</p>

                break;
            case "ERROR":
                lyricList = <b>Failed to load data, please try again</b>;
                break;
        }

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
                            <div>{lyricList}</div>


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
