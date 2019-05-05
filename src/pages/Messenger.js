import React from 'react';
import '../styles/MessageView.css';
import MessagesList from '../components/MessagesList';
import InputLine from '../components/InputLine';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Pass: report_id, report_title, student_id

class Messenger extends React.Component {
    constructor(props) {
      super(props)
      const { report } = this.props.location.state ? this.props.location.state : {}
      this.state = {
        messages: [],
        report_id: report ? report._id : '',
        report_title: report ? report.name : '',
        sender_id: '',
        student_id: report? report.student_id : '',
        sendstate: false
      }
      this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount() {
      var school_id = cookies.get('schoolID')
      if (school_id) {
        this.setState({sender_id: school_id})
      }
    }

    getMessages(){
      axios.get('http://localhost:8080/messages?report_id=' + this.state.report_id)
      .then((resp) => {
        this.setState({messages: resp.data});
      })
      .catch(err => console.log("Message Fetch Error Response: ", err));
    }

    showReport() {
      return;
    }

    sendMessage = async function (text) {
      var self = this
      await axios.post('http://localhost:8080/messages/new',
        {
          report_id: this.state.report_id,
          sender_id: this.state.sender_id,
          recipient_id: this.state.student_id,
          text: text
        })
        .then(function(res) {
          self.forceUpdate()
        })
        .catch(function(err) {
          console.log("ERROR", err);
        })
    }

    render() {
      if (cookies.get('schoolID') == null) {
        return (
            <Redirect to='/' />
          );
      }
      this.getMessages()
      return(
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
          <div className="namebar" style={{display: "flex"}}>
            <div style={{alignItems: "center"}}>
              <h1 className = "title is-5">{this.state.report_title}</h1>
              <h2 className = "subtitle is-6">Report Id: {this.state.report_id}</h2>
            </div>
            <div style={{float: "right", position: "fixed", right: "1em"}}>
              <Link to={'/home'}><button className="button" onClick={this.showReport()}>View Reports</button></Link>
            </div>
          </div>
          <MessagesList messages={this.state.messages} sender_id={this.state.sender_id} sendstate={this.state.sendstate}/>
          <InputLine submit={this.sendMessage.bind(this)}/>
        </div>
      )
    }

}
export default Messenger;
