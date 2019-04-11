import React, { Component } from "react";
import "./LyricDetail.css";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import SimpleFavorite from "../SimpleFavoriteList/SimpleFavortieList";
import modelInstance from "../data/LyricModel";
import { Container, Row, Col } from "reactstrap";
import AlbumInfo from "../AlbumInfo/AlbumInfo";

class LyricDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING",
            lyricId: this.props.id.match.params.id,
            favorited: this.props.isFavorite
        };
    }

    componentDidMount() {
        console.log(this.state.lyricId)

        const script1 = document.createElement("script");

        script1.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script1.async = true;

        document.body.appendChild(script1);

        // const script2 = document.createElement("script");

        // script2.src = "./contorl.js";
        // script2.async = true;

        // document.body.appendChild(script2);


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

                let originalLyrics = this.state.lyric.lyrics_body;

                lyricList =
                    originalLyrics.split("\n").map((i, index) => {
                        return <div key={index}>{i}</div>;
                    })


                break;
            case "ERROR":
                lyricList = <b>Failed to load data, please try again</b>;
                break;
            default:
                lyricList = <em>Loading...</em>;
                break;
        }

        return (
            <div className="LyricDetail">


                <Container>
                    <Row>
                        <Col lg="12" md="12" xs="12">
                            <h1>Lyric Detail</h1>
                        </Col>

                        <Col lg="8" md="8" xs="12">
                            <AlbumInfo parentState={this.state} />

                            <span className="h2">Lyrics</span>
                            <span className="right">

                                {/*<img src={this.props.gif.images.downsized.url} onClick={() => this.props.onGifSelect(this.props.gif)} />*/}
                                {/* <Button className="margin">Add to Favorite</Button> */}
                                <span>
                                    {this.renderFavoriteHeart()}
                                </span>

                            </span>
                            <div id="google_translate_element" className="translate" >{lyricList}</div>

                        </Col>
                        <Col lg="4" md="4" xs="12">
                            <SimpleFavorite />
                            <SuggestionSidebar />
                        </Col>


                    </Row>
                </Container>
            </div>
        );
    }
}

export default LyricDetail;
