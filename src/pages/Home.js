import React from 'react'
import Menu from '../components/Menu'
import ReportModal from '../components/ReportModal'

import { Redirect } from 'react-router';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      reports: [],
      open: false,
      schoolName: '',
      lastMessages: [],
    }
  }

  componentWillMount() {
    var school_id = cookies.get('schoolID')
    if (school_id) {
      fetch('school/' + school_id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({schoolName: json.name})
      })
      fetch('reports/' + school_id )
      .then((response) => response.json())
      .then((json) => {
        this.setState({reports: json.reports})
        this.setState({lastMessages: json.lastMessages})
      })
    }
  }

  getLastMessage(report_id) {
    var lastMessage = null;
    this.state.lastMessages.forEach((obj) => {
      if (obj.reportID === report_id) {
        lastMessage = obj.last_message;
      }
    })
    return lastMessage;
  }


  toggleModal(report) {
    this.setState({open: !this.state.open, report: report})
  }

  render() {
    if (cookies.get('schoolID') == null) {
      return (
          <Redirect to='/' />
        );
    };

    return (
      <div className="hero is-fullheight">
        <div className="columns" style={{display: "flex", backgroundColor: "#f2f2f2", flexGrow: 1}}>
          <Menu />
          <div className="column is-10">
            <h1 className="title"> Welcome, {this.state.schoolName}. </h1>
            <div className="card" style={{margin: "30px 100px", borderRadius: 5, overflowY: "auto", height: "80vh", overflowX: "hidden"}}>
              <header className="card-header is-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                <p className="card-header-title">
                  Current Reports
                </p>
              </header>
              <div style={{padding: "10px 0px"}}>
                {this.state.reports ? this.state.reports.map((report) => {
                  var lastMessage = this.getLastMessage(report._id)
                  var date_of_report = new Date(report.time_of_report)
                  var date_of_incident = new Date(report.time_of_incident)
                  return(<div
                    className="columns is-vcentered"
                    style={{
                      borderBottom: "1px solid #e5e5e5",
                      padding: "5px 20px"}}>

                    <div className="column is-4">
                      <p className="is-size-6">{report.name}</p>
                    </div>
                    <div className="column is-2">
                      <span className="tag">{report.category}</span>
                    </div>
                    <div className="column is-2">
                      {lastMessage !== null
                        ?
                        <span className="is-size-6">{lastMessage.text}</span>
                        : <span className="is-size-6">No messages</span>
                      }
                    </div>
                    <div className="column is-2">
                      <p className="is-size-6">{
                        date_of_report.getMonth() + 1 + "/" +
                        date_of_report.getDate() + "/" +
                        date_of_report.getFullYear()}
                        </p>
                    </div>
                                   <div className="column is-1">
                          <span
                            className="icon is-small"
                            style={{margin: 10, color: "#7d7d7d"}}
                            onClick={(e) => this.toggleModal(report)}>
                            <i className="fas fa-plus"></i>
                          </span>
                  </div>
                    <div>

                    {report.contact === "true" && report.messages.length === 0
                    ? <div>
                      <div className="column is-1">
                        <span
                          className="icon is-small"
                          style={{margin: 10, color: "red"}}
                          onClick={(e) => this.toggleModal(report)}>
                          <i className="fas fa-flag"></i>
                        </span>
                      </div>
                      </div>
                    :  null }
                  </div>
                  </div>
                )}) : ""}
            </div>
          </div>
        </div>
      </div>
      {this.state.open ? <ReportModal
        toggleModal={this.toggleModal.bind(this)}
        open={this.state.open}
        report={this.state.report}/> : <div></div>}
    </div>
    );
  }
}

export default Home;
