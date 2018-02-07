import React, { Component } from "react";
import { Button as Buttoni, ButtonContainer } from "../Button/Button";
import TextField from "material-ui/TextField"
import Button from "material-ui/Button";
import "./LoginPopup.css";

export class LoginPopup extends Component {

    constructor(props) {
        super(props);
        this.form = {};
        this.state = {
            mode: 0,
        }
    }
    
    callParent(e) {
        console.log("lel");
        e.preventDefault();
        //console.log(e.target["mode"].value);
        // if (e.target["mode"].value === "guest") {
        //     if (this.state.form.name.length < 3) return;
        //     this.props.connect({ mode: "guest", name: this.state.form.name });
        // }

        // if (e.target["mode"].value === "login") {
            const email = this.state.form.email;
            const pass = this.state.form.password;

            if (email.length < 3) return;
            if (pass.length < 3) return;
            
            this.props.connect({ mode: "login", ...this.state.form });
        // }
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

    handleInputChange = e => {
        console.log("PRESSED");
        this.form[e.target.id] = e.target.value;
        this.setState({
            ...this.state,
            form: this.form
        });
        setTimeout(() => {
            console.log(this.state);
        });
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
                {/* <div><input name="email"></input></div>
                <div><input type="password" name="password"></input></div>
                */}
                <TextField
                    label="E-Mail"
                    id="email"
                    onChange={this.handleInputChange}
                    fullWidth={true}
                />
                <br />
                <br />
                <TextField
                    label="Password"
                    id="password"
                    onChange={this.handleInputChange}
                    fullWidth={true}
                    type="password"
                />
                <div><input type="hidden" name="mode" value="login"></input></div> 
            </div>
        );

        return (
            <div ref="hideMe" className="LoginPopup">
                <div className="LoginPopup-choose">
                    <div
                        className="switch-mode"
                        onClick={this.toggleMode.bind(this)}
                    >
                        {this.state.mode ? "Switch to Login" : "Switch to Guest"}
                    </div>
                    <div className="LoginPopup-header">
                        <h1>Login</h1>    
                    </div>    
                    <form onSubmit={this.callParent.bind(this)}>
                        <div className="LoginPopup-body">
                            <div className="input-container">
                                {this.state.mode ? guest : login}
                            </div>
                        </div>
                        <div className="LoginPopup-footer">
                            {/* <ButtonContainer>
                                <Button className="submit-button">OK</Button>
                            </ButtonContainer> */}
                            <Button color="primary">OK</Button>
                        </div>
                    </form>
                </div>
            </div>    
        )
    }
}