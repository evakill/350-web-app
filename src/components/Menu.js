import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => (
  <div className="column is-2 is-centered" style={{padding: 30, backgroundColor: "#fff"}}>
    <aside className="menu">
    <p className="title is-5"> Bully-Boo-Boo </p>
    <p className="subtitle is-6"> School Name </p>
    <p className="menu-label">
      View
    </p>
    <ul className="menu-list">
    <li><Link to="/home">Home</Link></li>
      <li><Link to="/messages">Messages</Link></li>
      <li><Link to="/reports">Reports</Link></li>
    </ul>
    <p className="menu-label">
      Settings
    </p>
    <ul className="menu-list">
      <li><Link to="/edit">Edit Report Questions</Link></li>
    </ul>
    <p className="menu-label">
      Account
    </p>
    <ul className="menu-list">
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  </aside>
</div>
);

export default Menu;
