import React, { Component } from 'react';
import { post } from '../../lib/httprequest';
import { ChannelBar } from '../ChannelBar/ChannelBar';
import { TextChat } from '../TextChat/TextChat';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import './App.css';
const config = require('../../config/default.json');

class App extends Component {
  constructor() {
    super()
    this.state = {
      channel: 0,
      sessionid: null,
      ws: null,
      messageListener:[]
    };
  }

  async loginAsGuest(username) {
    console.log(config);
    const response = await post(
      `${config.protocol}://${config.location}:${config.port}/guest/create`,
      { username }
    );
    const sessionid = response.user.sessionid;
    this.setState({ ...this.state, sessionid });
  }
  
  registerMessageListener(listener) {
    const messageListener = this.state.messageListener.slice();
    messageListener.push(listener);

    this.setState({
      ...this.state,
      messageListener
    });
  }

  componentDidUpdate() {
    if (this.state.sessionid && !this.state.ws) {
      const ws = new WebSocket(
        `${config.wsProtocol}://${config.location}:${config.wsPort}`,
        ["sessionid", this.state.sessionid]
      );
      ws.onopen = (e) => { };
      ws.onmessage = (message) => {
        this.state.messageListener.forEach(listener => {
          listener(message);
        });
      }
      this.setState({
        ...this.state,
        ws
      })
    }
  }

  changeChannel(channel) {
    this.setState({
      ...this.state, channel
    });
  }

  setSessionID(sessionid) {
    this.setState({
      ...this.state,
      sessionid
    });
    alert("logged in with " + sessionid);
  }
  render() {
    return (
      <div className="App">
        <LoginPopup
          connect={this.loginAsGuest.bind(this)}
          hide={!!this.state.sessionid}
        />  
        <ChannelBar channelChange={this.changeChannel.bind(this)}/>
        <TextChat
          channel={this.state.channel}
          sessionid={this.state.sessionid}
          onmessage={this.registerMessageListener.bind(this)}
          ws={this.state.ws}
        />
      </div>
    );
  }
}

export default App;
