import React, { Component } from "react";
import { Redirect } from 'react-router';
import 'whatwg-fetch';
import "./Signup.css";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Logout extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    cookies.remove('schoolID', { path: '/' });
    return (
        <Redirect to='/' />
      );
  }
}
