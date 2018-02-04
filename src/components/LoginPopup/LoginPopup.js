import React, { Component } from "react";
import "./LoginPopup.css";

export class LoginPopup extends Component {

    constructor() {
        super();
        this.state = {
            mode: 0,
        }
    }
    
    callParent(e) {
        e.preventDefault();
        console.log(e.target["mode"].value);
        if (e.target["mode"].value === "guest") {
            if (e.target["name"].value.length < 3) return;
            this.props.connect({ mode: "guest", name: e.target["name"].value });
        }

        if (e.target["mode"].value === "login") {
            const email = e.target["email"];
            const pass = e.target["password"];
            if (email.value.length < 3) {
                const oldColor = email.style.color;
                email.style.color = "red";
                setTimeout(() => {
                    email.style.color = oldColor;
                }, 3000);
                return;
            }
            if (pass.value.length < 3) {
                const oldColor = pass.style.color;
                pass.style.color = "red";
                setTimeout(() => {
                    pass.style.color = oldColor;
                }, 3000);
                return;
            }
            this.props.connect({ mode: "login", email: email.value, password: pass.value });
        }
    }

    componentDidMount() {
        if (this.props.hide) this.refs.hideMe.classList.add("is-hidden");
        else this.refs.hideMe.classList.remove("is-hidden");
    }

    componentDidUpdate() {
        if (this.props.hide) this.refs.hideMe.classList.add("is-hidden");
        else this.refs.hideMe.classList.remove("is-hidden");
    }

    toggleMode() {
        this.setState({ ...this.state, mode: !this.state.mode });
    }

    render() {
        const guest = (
            <div>
                <input name="name"></input>
                <input type="hidden" name="mode" value="guest"></input>
            </div>
        );

        const login = (
            <div>
                <div><input name="email"></input></div>
                <div><input type="password" name="password"></input></div>
                <div><input type="hidden" name="mode" value="login"></input></div>

            </div>
        );

        return (
            <div ref="hideMe" className="LoginPopup">
                <div className="LoginPopup-choose">
                    <div className="switch-mode" onClick={this.toggleMode.bind(this)}>{this.state.mode ? "Switch to Login" : "Switch to Guest"}</div>
                    <div>
                        <h4>Please choose your name</h4>
                        <div className="input-container">
                            <form onSubmit={this.callParent.bind(this)}>
                                {this.state.mode ? guest : login}
                                <button>OK</button>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>    
        )
    }
}