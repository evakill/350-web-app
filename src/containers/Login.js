import React, { Component } from "react";
import { Link} from "react-router-dom";
import { Redirect } from 'react-router';
import 'whatwg-fetch';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Navbar,
  Nav,
  NavItem,

} from "react-bootstrap";
import "./Signup.css";
import {
  setInStorage,
} from '../utils/storage';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Signup extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      successfulLogin: false,
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    // this.onSignUp = this.onSignUp.bind(this);
    // this.logout = this.logout.bind(this);
  }

  componentWillMount() {
      this.setState({
        isLoading: false,
      });
  }



  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpName(event) {
    this.setState({
      signUpName: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          alert("Logged In")
          cookies.set('schoolID', json.schoolID, { path: '/' });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            successfulLogin: true,
          });
        } else {
          alert(json.message)
          this.setState({
            signInError: json.message,
            isLoading: false,
            successfulLogin: false,
          });
        }
      });
  }



  render() {
    const {
      successfulLogin,
      isLoading,
      signInEmail,
      signInPassword,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!successfulLogin) {
      return (

        <div>
          <div>

    <div className="App container">

      <Navbar fluid collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">BullyBye</Link>
          </Navbar.Brand>
          <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavItem href="/signup">Signup</NavItem>
            <NavItem href="/login">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
          </div>
          <br />
          <br />
          <div>
          <div className="Signup">
          <form onSubmit={this.onSignIn}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={signInEmail}
            onChange={this.onTextboxChangeSignInEmail}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}
            type="password"
          />
        </FormGroup>
        <Button
            block
            bsSize="large"
            type="submit"
          >
            Log In
        </Button>
      </form>
      </div>
          </div>

        </div>
      );
    }

    return (
        <Redirect to='/home' />
    );

  }
}
