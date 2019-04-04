import React from 'react'
import Menu from '../components/Menu'


class Home extends React.Component {
  render() {
    return (
      <div className="hero is-fullheight">
        <div className="columns" style={{display: "flex", backgroundColor: "#f2f2f2", flexGrow: 1}}>
          <Menu />
          <div className="column is-10">
            <h1 className="title"> Welcome, School Name! </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
