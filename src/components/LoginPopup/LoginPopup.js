import React, { Component } from "react";
import styled from "styled-components";
import "./LoginPopup.css";

const Popup = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(85, 85, 85, 0.87);
    visibility: ${p => p.hide ? 'hidden' : 'visible'}
`

const Choose = styled.div`
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    width: 250px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    h4 {
        margin: 0;
    }
`

const Switcher = styled.div`
    position: absolute;
    top: -36px;
    left: 0;
    border: 1px solid black;
    padding: 4px;
    background-color: white;
    border-bottom: 0;
    cursor: pointer;
    font-size: 22px;
`
const Option = styled.div`
    float: left;
    color: ${p => p.active ? 'white' : 'black'};
    background-color: ${p => p.active ? 'black' : 'white'};
    &:not(:last-child) {
        border-right: 1px solid black;
    }
`
export class LoginPopup extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'guest',
        }
    }

    callParent(e) {
        e.preventDefault();
        console.log(this.state.mode);
        if (this.state.mode === "guest") {
            if (e.target["name"].value.length < 3) return;
            this.props.connect({ mode: "guest", name: e.target["name"].value });
        }

        if (this.state.mode === "login") {
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

        if (this.state.mode === "register") {
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
            this.props.connect({ mode: "register", email: email.value, password: pass.value });
        }
    }

    selectMode(mode) {
        this.setState({ ...this.state, mode: mode });
    }

    render() {
        const modes = {};
        modes.guest = (
            <div>
                <h4>Please choose your name</h4>
                <input name="name"></input>
                <input type="hidden" name="mode" value="guest"></input>
            </div>
        );

        modes.login = (
            <div>
                <h4>Please login</h4>
                <div><input name="email"></input></div>
                <div><input type="password" name="password"></input></div>
                <div><input type="hidden" name="mode" value="login"></input></div>
            </div>
        );

        modes.register = (
            <div>
                <h4>Please login</h4>
                <div><input name="email"></input></div>
                <div><input type="password" name="password"></input></div>
                <div><input type="hidden" name="mode" value="register"></input></div>
            </div>
        );

        return (
            <Popup hide={this.props.hide}>
                <Choose>
                    <Switcher>
                        <Option key={"login"} onClick={() => this.selectMode("login")}
                            active={this.state.mode === "login"}>Login</Option>
                        <Option key={"guest"} onClick={() => this.selectMode("guest")}
                            active={this.state.mode === "guest"}>Guest</Option>
                        <Option key={"register"} onClick={() => this.selectMode("register")}
                            active={this.state.mode === "register"}>Register</Option>
                    </Switcher>
                    <div>

                        <div className="input-container">
                            <form onSubmit={this.callParent.bind(this)}>
                                {modes[this.state.mode]}
                                <button>OK</button>
                            </form>
                        </div>
                    </div>
                </Choose>
            </Popup>
        )
    }
}