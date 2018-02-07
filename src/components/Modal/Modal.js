import React, { Component } from 'react';
import "./Modal.css";

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
            show: props.show,
        };
    }

    componentWillReceiveProps(props) {
        console.log("updating", props);
        this.setState({...props});
    }

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    sendResponse = (e) => {
        this.props.responseHandler(e.target.id, e.target);
    }

    renderModal() {
        if (!this.state.show) return;
        const title = this.state.title ? this.state.title : "Info";
        const text = Array.isArray(this.state.text) ? this.state.text.map(t => { console.log(t); return <p>{t}</p>; }) : this.state.text;
        const buttonText = this.state.buttonText || "OK"; 

        return (
            <div className="modal-content">
                <h2 className="modal-content-title">{title}</h2>
                <div className="modal-content-text">{ text }</div>
                <button id="OK" className="modal-content-button" onClick={this.sendResponse}>{buttonText}</button>
            </div>
        )
    }

    render() {
        return (
            <div className="modal-background" style={{ visibility: + this.state.show ? "visible" : "hidden" }}>
                <div className="modal-container">
                    {this.state.advanced ? this.renderAdvancedModal() : this.renderModal() }    
                </div>    
            </div>    
        )    
    }
}