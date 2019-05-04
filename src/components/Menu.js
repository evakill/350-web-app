import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schoolName: ''
    }
  }

  componentWillMount() {
      var school_id = cookies.get('schoolID')
      var school_name = ''
      fetch('school/' + school_id)
        .then((response) => response.json())
        .then((json) => {
          this.setState({schoolName: json.name})
      })
    }

  render() {
    return (
      <div className="column is-2 is-centered" style={{padding: 30, backgroundColor: "#fff"}}>
        <aside className="menu">
          <p className="title is-5"> BullyBye </p>
          <p className="subtitle is-7"> {this.state.schoolName} </p>
          <p className="menu-label">
            View
            </p>
          <ul className="menu-list">
            <li><Link to="/home">Home</Link></li>
          </ul>
          <p className="menu-label">
            Settings
          </p>
          <ul className="menu-list">
            <li><Link to="/edit">Edit Questions</Link></li>
          </ul>
          <p className="menu-label">
            Account
          </p>
          <ul className="menu-list">
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </aside>
      </div>
    )
  }
}

export default Menu;
