import React from "react";
import "./Login.css";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import FadeTransition from "./Transitions/fadeTransitions";
import fire from "../Config/Fire";
import Tabs from "../FavoriteDetail/Tabs/Tabs";
import { Link, Route } from "react-router-dom";

import { createHashHistory } from "history";

class LoginAndRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLogin() {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    });
  }

  showRegister() {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    });
  }

  render() {
    return (
      <div className="root">
        <div>
          <button className="lineBtn1" onClick={this.showLogin.bind(this)}>
            Login
          </button>

          <button className="lineBtn2" onClick={this.showRegister.bind(this)}>
            Register
          </button>
        </div>

        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <Login />
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <Register />
          </div>
        </FadeTransition>
      </div>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      email: "",
      password: ""
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    //const router = this.props.params.router;
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log("login success!");
        window.history.back();
      })
      .catch(error => {
        console.log(error);
        window.alert("Error : " + error.message);
      });

    //If user login, we can get user's uid
    if (fire.auth().currentUser != null) {
      console.log("get user's uid" + fire.auth().currentUser.uid);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.email);
  }

  render() {
    return (
      <Form className="normalLink">
        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="Input your Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Input your password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <button type="submit" className="loginRegBtn" onClick={this.login}>
            Login
          </button>
        </FormGroup>
      </Form>
    );
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: []
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  register(e) {
    console.log("dadf" + this.state.email);
    e.preventDefault();
    fire
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(u => {
        console.log("Register success!");
        window.history.back();
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });

    var username = this.state.username;
    fire
      .database()
      .ref("/users/" + username + "/userInfo")
      .set({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.email);
  }

  showErrorInformation(element, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          element,
          msg
        }
      ]
    }));
  }

  clearErrorInformation(element) {
    this.setState(prevState => {
      let newArr = [];
      for (let error of prevState.errors) {
        if (element !== error.element) {
          newArr.push(error);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
  }

  sumbitRegister(e) {
    if (this.state.username === "") {
      this.showErrorInformation("username", "Username cannot be empty!");
      console.log("username cannot be empty");
    }
    if (this.state.email === "") {
      this.showErrorInformation("email", "Email cannot be empty!");
      console.log("username cannot be empty");
    }
    if (this.state.password === "") {
      this.showErrorInformation("password", "Password cannot be empty!");
      console.log("username cannot be empty");
    }
  }

  render() {
    var emailError = null;
    var usernameError = null;
    var passwordError = null;

    for (let error of this.state.errors) {
      if (error.element === "username") {
        usernameError = error.msg;
      }
      if (error.element === "password") {
        passwordError = error.msg;
      }
      if (error.element === "email") {
        emailError = error.msg;
      }
    }

    return (
      <Form className="normalLink">
        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            id="email"
            placeholder="Input your Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <small>{emailError ? emailError : ""}</small>
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="Input your username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <small>{usernameError ? usernameError : ""}</small>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Input your password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <small>{passwordError ? passwordError : ""}</small>
        </FormGroup>
        <FormGroup>
          <button type="submit" className="loginRegBtn" onClick={this.register}>
            Register
          </button>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginAndRegister;
