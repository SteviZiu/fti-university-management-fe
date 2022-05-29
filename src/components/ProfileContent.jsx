import { Component } from "react";
import { loginRequest } from "../authConfig";
// Msal imports
import { InteractionType, InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import AuthActions from "../reducers/AuthActions.js";
import { connect } from 'react-redux';/**
 * This class is a child component of "Profile". MsalContext is passed
 * down from the parent and available as a prop here.
 */
 class ProfileContent extends Component {

    constructor(props) {
        super(props)
    }

    setGraphData() {
        if (!this.props.graphData && this.props.msalContext.inProgress === InteractionStatus.None) {
            const request = {
                ...loginRequest,
                account: this.props.msalContext.accounts[0]
            };
            this.props.msalContext.instance.acquireTokenSilent(request).then((response) => {
                this.props.setGraphData(this.props.msalContext, response.accessToken );
            }).catch((e) => {
                this.props.msalContext.instance.acquireTokenRedirect(request).then((response) => {
                    this.props.setGraphData(this.props.msalContext, response.accessToken );
                });
            });
        }
    }

    componentDidMount() {
        this.setGraphData();
    }

    componentDidUpdate() {
        this.setGraphData();
    }
  
    render() {
        return (
                // <ProfileData graphData={this.state.graphData} /> 
            <p>juhu!</p>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setGraphData: (msalContext, token) => dispatch(AuthActions.setGraphData(msalContext, token )),
});

const mapStateToProps = (state) => ({
    graphData: state.auth.graphData
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent);