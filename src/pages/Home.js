import React from 'react'
import Menu from '../components/Menu'

class Home extends React.Component {
  render() {
    return (
      <div style={{display: "flex", backgroundColor: "#f2f2f2"}}>
        <Menu />
      </div>
    );
  }
}

export default Home;
