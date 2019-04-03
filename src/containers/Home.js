import React, { Component } from "react";
import "./Home.css";
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

// componentDidMount() {
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch('/verify?token=' + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               isAuthenticated: true,
//             });
//           } 
//         });
//     } 
//   }

  render() {
    // const {
    //   isAuthenticated,
    // } = this.state;

    // if(isAuthenticated) { 
    //   return (
    //       <Redirect to='/home' />
    //   );
    // }
    return (
      <div className="Home">
        <div className="lander">
          <h1>Confidely</h1>
          <p>Record it, report it, don’t support it</p>
          <ul className="menu-list">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}