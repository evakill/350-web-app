import React from 'react';
import '../styles/MessageView.css';

class InputTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submit(this.state.text);
        this.setState({text: ""});
      }
      
    render () {
        return(
            <div className="textinput">
                <textarea className="textarea" value={this.state.text} onChange={(e) => this.handleChange(e)} placeholder="Type message here..."></textarea>
                <button className="button is-primary" style={{margin: "0.5em", float: "right"}} onClick={(e) => this.handleSubmit(e)}>
                <span className="icon is-small" style={{marginRight: "5px"}}>
                <i className="fas fa-paper-plane"></i>
                </span>
                Send
                </button>
            </div>
        )
    }
}

export default InputTime;
