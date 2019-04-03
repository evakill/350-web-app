import React from 'react'
import { Link } from 'react-router-dom'

class ReportModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render(){
    var { open, report, toggleModal } = this.props
    var question_answer = JSON.parse(report.question_answer)
    var date_of_report = new Date(report.time_of_report)
    var date_of_incident = new Date(report.time_of_incident)
    return(
      <div className={open ? "modal is-active" : "modal"}>
        <div className="modal-background" style={{backgroundColor: "#f2f2f2", opacity: 0.9}}></div>
        <div className="card" style={{borderRadius: 5, width: "80%"}}>
          <header class="card-header is-flex" style={{justifyContent: "space-between", alignItems:"center"}}>
            <h1 class="card-header-title">
              {report ? report.name : ""}
            </h1>
            <span
              style={{color: "black", margin: 15}}
              onClick={(e)=>toggleModal(report)}>
              <i className="fas fa-times"></i>
            </span>
          </header>
          <div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
            <b>Category: </b>
            <span style={{margin:10}} className="tag">{report ? report.category : ""}</span>
          </div>
          <div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
            <b>Date of incident: </b>
            <p>
              {date_of_incident.getMonth() + 1 + "/" +
              date_of_incident.getDate() + "/" +
              date_of_incident.getFullYear()}
            </p>
          </div>
          <div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
              <b>Date of report: </b>
              <p>
                {date_of_report.getMonth() + 1 + "/" +
                date_of_report.getDate() + "/" +
                date_of_report.getFullYear()}
              </p>
          </div>
          {question_answer ? question_answer.map((qa) => {
            console.log(qa)
            return(<div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
              <b>{qa.question}</b>
              <p>{qa.answer}</p>
            </div>)
          }): ""}
          <div>
            <Link to="/Messages"><button className="button" style={{margin: 20, float: "right"}}>See Messages</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportModal
