import React from 'react'
import Menu from '../components/Menu'
import { Redirect } from 'react-router';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class EditQuestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      newQ: false,
      inputQ: '',
    }
  }

  componentWillMount() {
    var school_id = cookies.get('schoolID')
    if (school_id == null) {
      return
    }

    fetch('questions/' + school_id)
    .then((response) => response.json())
    .then((json) => {
      this.setState({questions: json.questions})
    })
  }

  saveQuestion() {
    var school_id = cookies.get('schoolID')
    if (school_id == null) {
      return
    }

    var question = this.state.inputQ;
    fetch('question/new/' + school_id, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"question": question}), // body data type must match "Content-Type" header
    })
    .then(response=>response.json())
    .then(json=>this.setState({questions:json, newQ:false, inputQ: ''}))
  }

  deleteQuestion(question) {
    var school_id = cookies.get('schoolID')
    if (school_id == null) {
      return
    }

    fetch('question/delete/' + school_id, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"question": question}), // body data type must match "Content-Type" header
    })
    .then(response=>response.json())
    .then(json=>this.setState({questions:json, newQ:false, inputQ: ''}))
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
            <h1 className="title"> Edit Report Questions </h1>
            <div className="card" style={{margin: "30px 100px", borderRadius: 5}}>
              <header className="card-header is-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                <p className="card-header-title">
                  Current Questions
                </p>
                <span className="icon is-small" style={{margin: 20}} onClick={(e)=>this.setState({newQ: true})}>
                  <i className="fas fa-plus"></i>
                </span>
              </header>
              <div style={{padding: "10px 0px"}}>
                  {this.state.questions.map((question) => (
                    <div style={{
                      display: "flex",
                      justifyContent:"space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #e5e5e5",
                      padding: "5px 20px"}}>
                      <p className="is-size-6">{question}</p>
                      <span
                        className="icon is-small"
                        style={{margin: 10, color: "#7d7d7d"}}
                        onClick={(e)=>this.deleteQuestion(question)}>
                        <i className="fas fa-trash"></i>
                      </span>
                    </div>
                  ))}
                {this.state.newQ ?
                  (<div class="field" style={{padding: 10}}>
                      <label class="label">Enter new question.</label>
                      <div class="control">
                        <textarea
                          class="textarea"
                          placeholder="Enter question"
                          value={this.state.inputQ}
                          onChange={(e)=>this.setState({inputQ: e.target.value})}>
                          </textarea>
                      </div>
                      <div className="control" style={{display: "flex", justifyContent: "flex-end"}}>
                        <button
                          className="button is-small"
                          style={{margin: 10}}
                          onClick={(e)=>this.saveQuestion()}>
                          Save
                        </button>
                        <button
                          className="button is-small"
                          style={{margin: 10}}
                          onClick={(e)=>this.setState({newQ: false, inputQ: ''})}>
                          Cancel
                        </button>
                      </div>
                    </div>) : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditQuestions;
