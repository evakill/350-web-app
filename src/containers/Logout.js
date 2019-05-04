import React, { Component } from "react";
import { Redirect } from 'react-router';
import 'whatwg-fetch';
import "./Signup.css";
import {
  getFromStorage,
} from '../utils/storage';

export default class Logout extends Component  {
  constructor(props) {
    super(props);
  }

render() {
    return (
        <Redirect to='/' />
      );
  }
}
