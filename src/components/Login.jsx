import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInButton from "./SignInButton";
import bcg from "../img/bcg.jpg";
import "../css/all.css"

class Login extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {this.props.user.bearer ? null :
                    <div style={{ backgroundImage: `url(${bcg})`, height: window.innerHeight, maskRepeat: "no-repeat" }} >
                        <div className="card col-4 fixed">
                            <div className="card-body">
                                <h5 className="card-title">Login to your account</h5>
                                <SignInButton msalContext={this.props.msalContext} />
                            </div>
                        </div>

                    </div>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);