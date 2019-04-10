import React, { Component } from "react";
import "./LyricDetail.css";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import SimpleFavorite from "../SimpleFavoriteList/SimpleFavortieList";
import modelInstance from "../data/LyricModel";
import { Container, Row, Col, Button } from "reactstrap";
import AlbumInfo from "../AlbumInfo/AlbumInfo";
import fire from "../Config/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    onFavoriteSelect(selectedLyric)  {
       modelInstance.addFavoriteLyric({selectedLyric}) 
    }

    onFavoriteDeselect(selectedLyric) {
        modelInstance.removeFavoriteLyric({selectedLyric}) 
    }

    favoriteLyric() {
        this.setState({ favorited: true });
        this.onFavoriteSelect(this.state.lyric);
      }

    unfavoriteLyric() {
        this.setState({ favorited: false });
        this.onFavoriteDeselect(this.state.lyric);
    }

    renderFavoriteHeart = () => {
        //if the user is not authenticated, the fav button is not shown since we don't want them to be able to save songs
        if (fire.auth().currentUser == null)
           return '';
        //if the song is not saved as fav the heart is not colored
        if (this.state.favorited) {
          return <FontAwesomeIcon icon={['fas', 'heart']} onClick={() => this.unfavoriteLyric()} />;
        // return <FontAwesomeIcon icon="heart" onClick={() => this.unfavoriteLyric()} />;
        }
        //if the sond is the song is saved as fav the heart is colored
        return <FontAwesomeIcon icon={['far', 'heart']} onClick={() => this.favoriteLyric()} />;
      };
    
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
                                <Button > { this.renderFavoriteHeart() } </Button>
                                <Button className="margin">Translate</Button>
                            </span>
                            <div>{lyricList}</div>

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
