import React, { Component } from 'react';
import { post } from '../../lib/httprequest';
import { ChannelBar } from '../ChannelBar/ChannelBar';
import { TextChat } from '../TextChat/TextChat';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import { Modal } from "../Modal/Modal";

import './App.css';

const config = require('../../config/default.json');

class App extends Component {
  constructor() {
    super()
    this.ml = [];
    this.errorModal = {};

    this.state = {
      channel: 0,
      sessionid: null,
      ws: null,
      messageListener: [],
      errorModal: {}
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
      
    }

    if (data.mode === "login") {
      response = await post(
        `${config.protocol}://${config.location}:${config.port}/login`,
        { email: data.email, password: data.password }
      )
      if (response.xmlhttp.status !== 200) {
        this.setState({
          ...this.state,
          errorModal: {
            text: response.data.error,
            show: true
          }
        });
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
      ws.onopen = (e) => {  };
      ws.onmessage = (message) => {
        const parsed = JSON.parse(message.data);
        this.state.messageListener.filter(listener => listener.type === parsed.type).forEach(listener => {
          listener.f(parsed);
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
    localStorage.setItem("sessionid", sessionid);
  }

  handleModalResponse = response => {
    console.log(response);
    this.setState({
      ...this.state,
      errorModal: {
        response,
        show: false
      }
    });
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
        <Modal
          show={this.state.errorModal.show}
          text={this.state.errorModal.text}
          title="Login Error"
          buttonText="Close"
          responseHandler={this.handleModalResponse}
        />
      </div>
    );
  }
}

export default App;
