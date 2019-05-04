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

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Signup extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpName:'',
      success:false,
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);

    // this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    // this.logout = this.logout.bind(this);
  }

  componentDidMount() {
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

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpName,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
      }),
    })
    .then(response=>response.json())
    .then(json => {
        console.log('json', json);
        if (json.success) {
          alert("Signed Up")
          this.setState({
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpName:'',
            success:true,
          });
          cookies.set('schoolID', json.schoolID, { path: '/' });
        } else {
          alert(json.message)
          this.setState({
            isLoading: false,
          });
        }
      });
  }


  render() {
    const {
      isLoading,
      signUpEmail,
      signUpPassword,
      signUpName,
      success,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!success) {
      return (
        <div>
          <div>
               <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">BullyBye</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
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
          <form onSubmit={this.onSignUp}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={signUpName}
            onChange={this.onTextboxChangeSignUpName}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={signUpEmail}
            onChange={this.onTextboxChangeSignUpEmail}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={signUpPassword}
            onChange={this.onTextboxChangeSignUpPassword}
            type="password"
          />
        </FormGroup>
        <Button
            block
            bsSize="large"
            type="submit"
          >
            Signup
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
