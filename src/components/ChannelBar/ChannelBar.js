import React, { Component } from 'react';
import { get } from "../../lib/httprequest";
import './ChannelBar.css';
const config = require('../../config/default.json');
export class ChannelBar extends Component {
    constructor() {
        super();
        this.state = {
            channelList: [],
            activeChannel: 0,
        };
    }
    async componentWillMount() {
        const response = await get(`${config.protocol}://${config.location}:${config.port}/channel`);
        const channelList = response.data.channel.sort(this.compare);
        this.setState({ ...this.state, channelList });
        this.setActive(channelList[0].channelname);
    }

    componentDidMount() {
        this.props.onmessage({
            f: this.messageReceived.bind(this),
            type: "TEXT_MESSAGE"
        });
    }

    messageReceived(data) {
        const targetChannel = this.state.channelList.findIndex(channel => channel.channelname === data.to);
        if (this.props.channel === data.to) return;

        const cl = this.state.channelList.slice();

        cl[targetChannel].unread = true;
        this.setState({
            ...this.state,
            channelList: cl
        })
      
    }

    setActive(id) {
        this.props.channelChange(id);
        const index = this.state.channelList.findIndex(channel => {
            return channel.channelname === id
        });
        if (this.state.channelList[index].unread) {
            const cl = this.state.channelList.slice();

            cl[index].unread = false;
            this.setState({
                ...this.state,
                channelList: cl
            }) 
        }
    }

    compare(a, b) {
        return a.position - b.position;
    }

    renderList() {
        return this.state.channelList.map(channel => {
            let classString = "channel-bar-list-item";
            const notificationDot = channel.unread ? <span className="notificationDot"> O </span> : "";
            if (channel.channelname === this.props.channel)
                classString = `${classString} active`;    
            return (
                <li
                    className={ classString }
                    onClick={() => this.setActive(channel.channelname)}
                    key={channel.channelname}
                >
                    <span className="channel-name">
                        {channel.channelname}
                    </span>
                    {notificationDot}
                </li>
            )
        });
    }

    render() {
        return (
            <ul className="channel-bar">
                {this.renderList()}    
            </ul>    
        )
    }
}