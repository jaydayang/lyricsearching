import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {
  //Stateless functional component
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <Link className="col-sm-4" to={"/search/"}>
          LyricSearching
        </Link>
        <form>
          <div className="form-row align-items-center">
            <div className="col-sm-4 my-1">
              <label className="sr-only" htmlFor="inlineFormInputName">
                Search for:
              </label>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputName"
                placeholder="Search for:"
              />
            </div>
            <div className="col-auto my-1">
              <label
                className="mr-sm-2 sr-only"
                htmlFor="inlineFormCustomSelect"
              >
                Preference
              </label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option defaultValue value="0">
                  Lyric
                </option>
                <option value="1">Artist</option>
                <option value="2">Album</option>
              </select>
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <FontAwesomeIcon icon="heart" />
        </div>
      </nav>
    );
  }
}

export default NavBar;
