import React from 'react';
import '../styles/MessageView.css';
import MessagesList from './MessagesList';
import InputLine from './InputLine';
// Pass the report object and the user object

const DUMMY_DATA = [
  {
    id: "tiff",
    username: "Tiffany",
    text: "Do you want mac and cheese?"
  },
  {
    id: "evakill",
    username: "Eva",
    text: "I want mac and cheese!"
  }

]

class MessageView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        messages: [],
        uid: "tiff",
        // username: props.user.username || "Student",
        // report_id: props.report.report_id || "" 
      }
      this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount() {
      this.setState({messages: DUMMY_DATA})
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
          <MessagesList messages={this.state.messages} />
          <InputLine submit={this.sendMessage}/>
        </div>
      )
    }
  
}
export default MessageView;