import React, { Component } from "react";
import "./Input.css";

export class Input extends Component {
    render() {
        return (
            <div className="group">
                <input
                    onChange={this.props.onChange}
                    id={this.props.id}
                    required={this.props.required}
                    type={this.props.type ? this.props.type : "text"}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{this.props.name}</label>
            </div>  
        )
    }
}