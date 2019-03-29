import React from 'react';

class MessageReceive extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return(
            <li className="content" style={{width: "95%"}}>
                <div className="notification" style={{float: "left", textAlign: "left"}}>
                {this.props.text}
                </div>
            </li>
        )
    }
}

export default MessageReceive;