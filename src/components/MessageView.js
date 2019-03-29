import React from 'react';
// import MessageSend from './MessageSend';
// import MessageReceive from './MessageReceive';

class MessageView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        message_received: [],
      }
    }
    componentDidMount() {
      // this.setState({todos: dummyData})
    }
    showReport() {
      return;
    }
    render() {
      return(
        <div className="container is-fluid" style={{backgroundColor: "#d3d4d9"}}>
        {/* Navbar shenanigans */}
          <div 
          style={{backgroundColor: "white", padding: "1em", height: "6em", width: "100%", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)"}}>
              <h1 style={{textAlign: "center", marginBottom: "-0.6em"}} className = "title is-5">Student's name</h1>
              <h2 style={{textAlign: "center"}} className = "subtitle is-6">Report Title</h2>
              {/* <a className="button" onClick={this.showReport()}>Button</a> */}
          </div>
          {/* <MessageReceive/>
          <MessageSend/> */}

        </div>
      )
    }
  
}
export default MessageView;