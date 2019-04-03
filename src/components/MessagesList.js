import React from 'react';
import MessageSend from './MessageSend';
import MessageReceive from './MessageReceive';
import '../styles/MessageView.css';
// the messages should be sorted by time.

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: this.props.sender_id,
            messages: props.messages
        }
    }
    render () {
        return(
            <div className = "messagelist">
                <ul className = "thread">
                {this.props.messages.map(m => {
                    if (this.state.userid === m.sender_id) {
                        return (<MessageSend text={m.text}/>)
                    } else {
                        return (<MessageReceive text={m.text}/>)
                    }
                })}
                </ul>
            </div>
        )
    }
}

export default MessageList;