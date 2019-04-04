import React from 'react';
import '../styles/MessageView.css';
import MessagesList from './MessagesList';
import InputLine from './InputLine';
import axios from 'axios';

// Pass: report_id, report_title, student_id

class MessageView extends React.Component {
    constructor(props) {
      super(props)
      const { report } = this.props.location.state
      console.log(report)
      // this.setState({report_id: report.report_id, recipient_id: report.student_id, report_title: report.name})

      this.state = {
        messages: [],
        report_id: report._id || '5ca1232c30973a8280ebbad2',
        report_title: report.name || 'Student Report',
        sender_id: this.props.sender_id || '1', //this needs to be the id taken from cookies
        student_id: report.student_id || '2',
        sendstate: false
      }
      this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
      axios.get('http://localhost:8080/messages?report_id=' + this.state.report_id)
      .then((resp) => {
        console.log("Messages Fetch Response: ", resp);
        this.setState({messages: resp.data});
      })
      .catch(err => console.log("Message Fetch Error Response: ", err));
    }
    showReport() {
      return;
    }
    sendMessage(text) {
      var messages = this.state.messages;
      axios.post('http://localhost:8080/messages/new',
        {
          report_id: this.state.report_id,
          sender_id: this.state.sender_id,
          recipient_id: this.state.student_id,
          text: text
        }
      , function(err, res) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(res);
          this.setState({sendstate: !this.state.sendstate});
        }
      });
      
    }
    render() {
      return(
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
          <div className="namebar" style={{display: "flex"}}>
            <div style={{alignItems: "center"}}>
                <h1 className = "title is-5">{this.state.report_title}</h1>
                <h2 className = "subtitle is-6">Report Id: {this.state.report_id}</h2>
            </div>
            <div style={{float: "right", position: "fixed", right: "1em"}}>
              <button className="button" onClick={this.showReport()}>View Report</button>
            </div>
          </div>
          <MessagesList messages={this.state.messages} sender_id={this.state.sender_id} sendstate={this.state.sendstate}/>
          <InputLine submit={this.sendMessage}/>
        </div>
      )
    }
  
}
export default MessageView;