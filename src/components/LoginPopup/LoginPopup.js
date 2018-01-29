import React, { Component } from "react";
import "./LoginPopup.css";

export class LoginPopup extends Component {
    
    callParent(e) {
        e.preventDefault();
        if (this.refs.name.value.length < 3) return;
        this.props.connect(this.refs.name.value);
    }

    componentDidMount() {
        if (this.props.hide) this.refs.hideMe.classList.add("is-hidden");
        else this.refs.hideMe.classList.remove("is-hidden");
    }

    componentDidUpdate() {
        if (this.props.hide) this.refs.hideMe.classList.add("is-hidden");
        else this.refs.hideMe.classList.remove("is-hidden");
    }

    render() {
        return (
            <div ref="hideMe" className="LoginPopup">
                <div className="LoginPopup-choose">
                    <h4>Please choose your name</h4>
                    <div className="input-container">
                        <form onSubmit={this.callParent.bind(this)}>
                            <input ref="name"></input>
                            <button>OK</button>
                        </form>
                    </div>
                </div>    
            </div>    
        )
    }
}