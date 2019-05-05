import React from 'react'
import { Link } from 'react-router-dom'

class ReportModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    var { open, report, toggleModal } = this.props
    var question_answer = report.question_answer || []
    var date_of_report = new Date(report.time_of_report)
    var date_of_incident = new Date(report.time_of_incident)
    return(
      <div className={open ? "modal is-active" : "modal"}>
        <div className="modal-background" style={{backgroundColor: "#f2f2f2", opacity: 0.9}}></div>
        <div className="card" style={{borderRadius: 5, width: "80%", height: "80%"}}>
          <header className="card-header is-flex" style={{justifyContent: "space-between", alignItems:"center"}}>
            <h1 className="card-header-title">
              {report ? report.name : ""}
            </h1>
            <span
              style={{color: "black", margin: 15}}
              onClick={(e)=>toggleModal(report)}>
              <i className="fas fa-times"></i>
            </span>
          </header>
          <div style={{height: "70%", overflowY: "auto"}}>
            <div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
              <b>Category: </b>
              <span style={{margin:10}} className="tag">{report ? report.category : ""}</span>
            </div>
            <div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
              {report.contact === "true"
                ? <b> Student Wishes to be Contacted </b>
                : <b> Student does NOT wish to be contacted. </b>}
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
              return(<div style={{borderBottom: "1px solid #e5e5e5", padding: "5px 20px"}}>
                <b>{qa.question}</b>
                <p>{qa.answer}</p>
              </div>)
            }): ""}
            <div>
          </div>
          </div>
          {report.contact === "true" || report.messages.length !== 0
            ? <Link to={{pathname: '/messenger', state: {report: report}}}><button className="button" style={{margin: 20, float: "right"}}>See Messages </button></Link>
            : null}

        </div>
      </div>
    )
  }
}

export default ReportModal
