import React, { Component } from "react";
import "./SimpleFavoriteList.css";
import modelInstance from "../data/LyricModel";
import { Link } from "react-router-dom";

class SimpleFavoriteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING"
        };
    }

    componentDidMount() {

        modelInstance
            .getLyrics()
            .then(response => response.json())
            .then(data => {
                this.setState({
                    status: "LOADED",
                    tracks: data.message.body.track_list
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
                console.log(this.state.tracks[1].track);


                lyricList = this.state.tracks.map(song => (

                    <li className="favorLi" key={song.track.track_id}>{song.track.track_name}</li>
                ));

                break;
            case "ERROR":
                lyricList = <b>Failed to load data, please try again</b>;
                break;
        }

        return (
            <div className="SimpleFavoriteList">
                <h3>My Favorite</h3>

                <ul className="favorUl">{lyricList}</ul>
                <Link to="/favorite">

                    <button className="viewallButton">View All</button>
                </Link>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className="SimpleFavoriteList">
    //             <h3>My Favorite</h3>
    //             <ul className="favorUl">
    //                 <li className="favorLi">Song1</li>
    //                 <li className="favorLi">Song2</li>
    //                 <li className="favorLi">Song3</li>
    //             </ul>
    //             <Link to="/favorite">

    //                 <button className="viewallButton">View All</button>
    //             </Link>

    //         </div>
    //     );
    // }
}

export default SimpleFavoriteList;
