import React, { PureComponent } from 'react';
import Button from "react-bootstrap/Button";
import AuthActions from "../reducers/AuthActions.js";
import { connect } from 'react-redux';
import {withRouter} from '../utils/withRouter';

class SignInButton extends PureComponent {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }


    componentDidMount() {
        console.log("..componentDidMount");
    }

    handleLogin() {
        this.props.handleLogin(this.props.msalContext);
    }


    /**
     * Renders a button which, when selected, will redirect the page to the login prompt
     */
    render() {
        this.props.handleRedirect(this.props.msalContext.instance);
        return (
            <Button className="bsk-btn bsk-btn-default" onClick={() => this.handleLogin()}><i className="fab fa-microsoft x-alt" ></i> Sign in with Microsoft</Button>
            //<Button variant="secondary" className="ml-auto" onClick={() => this.handleLogin()}>Sign in using Microsoft</Button>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    handleLogin: (obj) => dispatch(AuthActions.handleLogin(obj)),
    handleRedirect: (obj) => dispatch(AuthActions.handleRedirect(obj)),
    login: (obj) => dispatch(AuthActions.login(obj)),
});

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInButton));