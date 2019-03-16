import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {

        };
    }

    render() {
        return (
            <div className="Login">
                <h2>This is the login component</h2>

                <Link to="/search">
                    <button>Login</button>
                </Link>
            </div>
        );
    }
}

export default Login;
