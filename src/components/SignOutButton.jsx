import React, { PureComponent } from 'react';
import Button from "react-bootstrap/Button";
import AuthActions from "../reducers/AuthActions.js";
import { connect } from 'react-redux';

class SignOutButton extends PureComponent {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }


    componentDidMount() {
        console.log("..componentDidMount");
    }

    handleLogout() {
        this.props.handleLogout(this.props.msalContext);
    }

    /**
     * Renders a button which, when selected, will redirect the page to the logout prompt
     */
    render() {

        return (
            <Button className="bsk-btn bsk-btn-default" onClick={() => this.handleLogout()}>Sign out</Button>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleLogout: (obj) => dispatch(AuthActions.handleLogout(obj))

});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton);