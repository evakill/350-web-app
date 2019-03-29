import React from 'react';

class MessageSend extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return(
            <li className = "content" style={{width: "95%"}}>
                <div className="notification is-primary" style={{float: "right", textAlign: "right"}}>
                {this.props.text}
                </div>
            </li>
        )
    }
}

export default MessageSend;