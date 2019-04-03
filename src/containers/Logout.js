import React, { Component } from "react";
import { Route, Link} from "react-router-dom";
import { Redirect } from 'react-router';
import 'whatwg-fetch';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Navbar,
  Nav,
  NavItem,

} from "react-bootstrap";
import "./Signup.css";
import Home from '../pages/Home.js'
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';

export default class Logout extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      islogout: false,
    };
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              islogout: true,
            });
          } else {
            this.setState({
              islogout: false,
            });
          }
        });
    } else {
      this.setState({
        isLoggedout: false,
      });
    }
  }

render() {
    return (
        <Redirect to='/' />
      );
  }
}