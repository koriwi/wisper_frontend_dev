import React, { Component } from 'react';
import './TextChat.css';

export class TextChat extends Component {
    constructor() {
        super();
        this.state = {
            messages: {}
        };
    }

    componentDidMount() {
        this.props.onmessage(this.messageReceived.bind(this));
    }
    
    messageReceived(e) {
        const data = JSON.parse(e.data);
        let messages = { ...this.state.messages };

        if (!messages[data.to]) messages[data.to] = [];
        messages[data.to].push({ text: data.text, from: data.from });

        this.setState({
            ...this.state,
            messages
        });
    }

    checkIfEnter(e) {
        e.preventDefault();
        if (this.refs.clearMe.value.trim().length === 0) return;
        const payload = JSON.stringify({
            target: this.props.channel,
            text: this.refs.clearMe.value.trim()
        });
        this.props.ws.send(payload);
        this.refs.clearMe.value = "";
    }
   
    renderMessages() {
        if (!this.state.messages[this.props.channel]) return;
        let i = 0;
        return this.state.messages[this.props.channel].map(channel => {
            const html = <p key={i++}><b>{channel.from}</b>: {channel.text}</p>;
            return html;
        });
    }

    render() {
        return (
            <div className="text-chat">
                <div
                    className="text-chat-history"
                    ref="fillMe"
                >
                {this.renderMessages()}    
                </div>
                <form onSubmit={this.checkIfEnter.bind(this)}>
                    <input
                        className="text-chat-input-area"
                        ref="clearMe"
                    />
                </form>
            </div>
        );
    }
}