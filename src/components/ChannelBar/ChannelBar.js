import React, { Component } from 'react';
import * as axios from 'axios';
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
        const response = await axios.get(`${config.protocol}://${config.location}:${config.port}/channel`);
        const channelList = response.data.channel.sort(this.compare);
        this.setActive(channelList[0].channelname);
        this.setState({ ...this.state, channelList});
    }

    setActive(id) {
        this.setState({ ...this.state, activeChannel: id });
        this.props.channelChange(id);
    }

    compare(a, b) {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
    }

    renderList() {
        return this.state.channelList.map(channel => {
            let classString = "channel-bar-list-item";
            if (channel.channelname === this.state.activeChannel)
                classString = `${classString} active`;    
            return (
                <li
                    className={ classString }
                    onClick={() => this.setActive(channel.channelname)}
                    key={channel.channelname}
                >
                    <div className="channel-name">
                        {channel.channelname}
                    </div>
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