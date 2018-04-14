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
    this.ml = [];
    this.state = {
      channel: 0,
      sessionid: null,
      ws: null,
      messageListener:[]
    };
  }
  componentWillMount() {
    const sessionid = localStorage.getItem("sessionid");
    if (sessionid) {
      this.setSessionID(sessionid);
    }
  }
  async login(data) {
    let response;
    if (data.mode === "guest") {
      response = await post(
        `${config.protocol}://${config.location}:${config.port}/guest/create`,
        { username: data.name }
      );
    if (response.xmlhttp.status !== 201) {
      alert(response.data.error);
      return;
    }
    }

    if (data.mode === "login") {
      response = await post(
        `${config.protocol}://${config.location}:${config.port}/login`,
        { email: data.email, password: data.password }
      )
      if (response.xmlhttp.status !== 200) {
        alert(response.data.error || response.data.errors.validation[0].message);
        return;
      }
    }
    const sessionid = response.data.sessionid;
    this.setSessionID(sessionid);
  }

  registerMessageListener(listener) {
    this.ml.push(listener);
    this.setState({
      ...this.state,
      messageListener: this.ml
    });
  }

  componentDidUpdate() {
    if (this.state.sessionid && !this.state.ws) {
      const ws = new WebSocket(
        `${config.wsProtocol}://${config.location}:${config.wsPort}`,
        ["sessionid", this.state.sessionid]
      );
      ws.onerror = () => this.removeSessionID();
      ws.onmessage = (message) => {
        const parsed = JSON.parse(message.data);
        this.state.messageListener.filter(listener => listener.type === parsed.type).forEach(listener => {
          listener.f(parsed);
        });
      }
      ws.onopen = () => (
        this.setState({
          ...this.state,
          ws
        })
      )
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
    localStorage.setItem("sessionid", sessionid);
  }

  removeSessionID() {
    this.setState({ ...this.state, sessionid: undefined, });
    localStorage.removeItem("sessionid");
  }
  render() {
    return (
      <div className="App">
        <LoginPopup
          connect={this.login.bind(this)}
          hide={!!this.state.sessionid}
        />
        <ChannelBar
          channelChange={this.changeChannel.bind(this)}
          channel={this.state.channel}
          onmessage={this.registerMessageListener.bind(this)}
        />
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
