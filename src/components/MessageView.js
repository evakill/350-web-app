import React from 'react';
import '../styles/MessageView.css';
import MessagesList from './MessagesList';
import InputLine from './InputLine';
import axios from 'axios';
// Pass the report object and the user object

class MessageView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        messages: [],
        report_id: "5ca1232c30973a8280ebbad2",
        sender_id: '1', //this needs to be the id taken from cookies
      }
      this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
      this.setState({report_id: this.props.report_id});
      axios.get('http://localhost:8080/messages?report_id=' + this.state.report_id)
      .then((resp) => {
        console.log("Messages Fetch Response: ", resp);
        this.setState({messages: resp.data});
      })
      .catch(err => console.log("Message Fetch Error Response: ", err));
    }
    componentDidMount() {
      // this.setState({messages: DUMMY_DATA})
    }
    showReport() {
      return;
    }
    sendMessage(text) {
      var oldMessages = this.state.messages;
      oldMessages.push({id: "tiff", username: "Tiffany", text: text});
      console.log(oldMessages);
      this.setState({messages: oldMessages});
    }
    render() {
      return(
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
          <div className="namebar" style={{display: "flex"}}>
            <div style={{alignItems: "center"}}>
                <h1 className = "title is-5">Student's name</h1>
                <h2 className = "subtitle is-6">Report Title</h2>
            </div>
            <div style={{float: "right", position: "fixed", right: "1em"}}>
              <button className="button" onClick={this.showReport()}>View Report</button>
            </div>
          </div>
          <MessagesList messages={this.state.messages} sender_id={this.state.sender_id}/>
          <InputLine submit={this.sendMessage}/>
        </div>
      )
    }
  
}
export default MessageView;