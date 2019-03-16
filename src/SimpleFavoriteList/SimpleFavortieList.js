import React, { Component } from "react";
import "./SimpleFavoriteList.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);


        this.state = {

        };
    }



    render() {
        return (
            <div className="SimpleFavorite List">
                <h3>This is the Favorite List Component</h3>
                <ul>
                    <li>Song1</li>
                    <li>Song2</li>
                    <li>Song3</li>
                </ul>
                <Link to="/favorite">

                    <button>View All</button>
                </Link>

            </div>
        );
    }
}

export default Sidebar;
