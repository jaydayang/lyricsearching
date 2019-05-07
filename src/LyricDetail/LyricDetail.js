import React, { Component } from "react";
import "./LyricDetail.css";
import SuggestionSidebar from "../SuggestionSidebar/SuggestionSidebar";
import SimpleFavorite from "../SimpleFavoriteList/SimpleFavortieList";
import modelInstance from "../data/LyricModel";
import { Container, Row, Col } from "reactstrap";
import AlbumInfo from "../AlbumInfo/AlbumInfo";
import { Button } from "reactstrap";

class LyricDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      status1: "LOADING",
      lyricId: this.props.id.match.params.id,
      favorited: true,
      trackId: []
    };
  }

  componentDidMount() {
    const script1 = document.createElement("script");

    script1.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script1.async = true;

    document.body.appendChild(script1);

    modelInstance
      .getOneLyric(this.state.lyricId)
      .then(response => response.json())
      .then(data => {
        this.setState({
          status: "LOADED",
          lyric: data.message.body.lyrics,
          idProxy: this.state.lyricId
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  componentDidUpdate(props) {
    if (this.state.idProxy != this.props.id.match.params.id) {
      this.setState({
        lyricId: this.props.id.match.params.id,
        idProxy: this.state.lyricId,
        status: "LOADING"
      });
      modelInstance
        .getOneLyric(this.state.lyricId)
        .then(response => response.json())
        .then(data => {
          this.setState({
            status: "LOADED",
            lyric: data.message.body.lyrics,
            idProxy: this.state.lyricId
          });
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }

  }
  backToOriginalLanguage() {

    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0];
    if (!iframe) return;

    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsById("originalLanguage");

    for (var i = 0; i < restore_el.length; i++) {
      if (restore_el[i].id.indexOf("restore") >= 0) {
        restore_el[i].click();
        var close_el = innerDoc.getElementsByClassName("goog-close-link");
        close_el[0].click();
        return;
      }
    }

  }

  render() {
    let lyricList = null;

    switch (this.state.status) {
      case "LOADING":
        lyricList = <em>Loading...</em>;
        break;
      case "LOADED":
        let originalLyrics = this.state.lyric.lyrics_body.substring(
          0,
          this.state.lyric.lyrics_body.indexOf("**")
        );

        lyricList = originalLyrics.split("\n").map((i, index) => {
          return <div key={index}>{i}</div>;
        });

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
            <Col lg="8" md="8" xs="12">
              <AlbumInfo parentState={this.state} />
              <span className=" sidebarTitle">Lyrics</span>
              <span className="right" />
              <div id="google_translate_element">

              </div>

              <div className="translate simpleFavorite">{lyricList}</div>
            </Col>
            <Col lg="4" md="4" xs="12">
              <br />
              <SimpleFavorite parentState={this.state} />
              <SuggestionSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LyricDetail;
