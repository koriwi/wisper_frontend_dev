import React, { Component } from 'react';
import * as axios from "axios";
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
    };
  }

  async loginAsGuest(username) {
    console.log(config);
    const response = await axios.post(
      `${config.protocol}://${config.location}:${config.port}/guest/create`,
      { username }
    );
    const sessionid = response.data.user.sessionid;
    this.setState({ ...this.state, sessionid });
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
        <TextChat channel={this.state.channel} sessionid={this.state.sessionid}/>
      </div>
    );
  }
}

export default App;
