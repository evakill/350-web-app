import React, { Component } from "react";
// import "./Home.css";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import {
  getFromStorage,
} from '../utils/storage';



export default class Home extends Component {
constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  render() {
    return (
      <div className="container" style={{dipslay: "flex", justifyContent: "center", alignItems: "center", marginTop: "5em"}}>
        {/* <div className="lander"> */}
        <div style={{textAlign: "center"}}>
          <h1 className="title">BullyBye</h1>
          <p className="subtitle">Record it, report it, don’t support it.</p>
        </div>
        {/* <figure className="image is-5by3" style={{transform: "scale(0.5)", marginTop: "-10em", marginBottom: "-10em"}}><img src="http://christinaung.com/wp-content/uploads/2014/06/christina_ung_schoolbully_t.jpg"/></figure> */}
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "1em"}}>
            <Link to="/login"><button className="button">Login</button></Link>
            <div style={{width: "10px", height: "10px"}}></div>
            <Link to="/signup"><button className="button is-primary">Signup</button></Link>
        </div>
      </div>
    );
  }
}