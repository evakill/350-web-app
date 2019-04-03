import React, { Component } from "react";
import "./Home.css";
import { Link } from 'react-router-dom'



export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Confidely</h1>
          <p>Record it, report it, don’t support it</p>
          <ul className="menu-list">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup2">Signup</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}