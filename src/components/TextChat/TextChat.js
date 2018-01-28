import React, { Component } from 'react';
import './TextChat.css';
const config = require('../../config/default.json');
export class TextChat extends Component {
    constructor() {
        super();
        this.state = {
            messages: {}
        };
    }
    async componentDidUpdate() {
        if (this.props.sessionid && !this.ws) {   
            const sessionid = this.props.sessionid;
            this.ws = new WebSocket(`${config.wsProtocol}://${config.location}:${config.wsPort}/guest/create`, ["sessionid",sessionid]);   
            this.ws.onopen = (e) => {};
            this.ws.onmessage = this.messageReceived.bind(this);
        }
    }

    messageReceived(e) {
        // this doesnt look right :-/
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
        if (e.keyCode !== 13) return; 
        const payload = JSON.stringify({
            target: this.props.channel,
            text: this.refs.clearMe.value.trim()
        });
        this.ws.send(payload);
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
                <textarea
                    className="text-chat-input-area"
                    onKeyUp={this.checkIfEnter.bind(this)}
                    ref="clearMe"
                >    
                </textarea>
            </div>
        );
    }
}