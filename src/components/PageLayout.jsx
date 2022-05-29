import React from "react";
import Login from "./Login";
import SignOutButton from "./SignOutButton";
import { connect } from 'react-redux';
import { Component } from "react";
import { MsalAuthenticationTemplate, withMsal, UnauthenticatedTemplate } from "@azure/msal-react";
import logo from '../img/logo.png';
import routes from "../utils/routes"
import Sidebar from "./Sidebar"
import AuthActions from "../reducers/AuthActions";
import {
    Navbar,
    Dropdown,
    Container
} from "react-bootstrap";
import Registration from "./Registration";

class PageLayout extends Component {

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.state = this.getInitalState();
    }

    getInitalState() {
        return {
            graphData: null,
            isOpen: false,
        }
    }


    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    };

    openSidebar() {
        document.documentElement.classList.toggle("nav-open");
        //sidebarToggle.current.classList.toggle("toggled");
    };

    render() {
        return (
            <>
                {this.props.userRegister ?
                    <Registration /> :
                    <div>

                        {this.props.user.bearer ?
                            <Sidebar routes={routes} /> : null}

                        <Navbar
                            color={"dark"}
                            expand="lg"
                            className={"navbar-absolute fixed-top navbar-transparent"}
                        >
                            <Container fluid>
                                {!this.props.user.bearer ?
                                    <div >
                                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" style={{ marginRight: "10px" }} />
                                        <Navbar.Brand href="/dashboard">University Managment System</Navbar.Brand>
                                    </div> : null}

                                {this.props.user.bearer ?
                                    
                                        <div className="navbar-wrapper">
                                            <Navbar.Brand href="/dashboard">{this.props.path}</Navbar.Brand>
                                        </div>  : null}
                                        {this.props.user.bearer ?

                                        <Navbar.Collapse className="justify-content-end">
                                            <Dropdown >
                                                <Dropdown.Toggle >
                                                    <i className="nc-icon nc-bell-55" />
                                                    <p>
                                                        <span className="d-lg-none d-md-block">Some Actions</span>
                                                    </p>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <SignOutButton msalContext={this.props.msalContext} />
                                        </Navbar.Collapse>
                                   : null}
                                   
                            </Container>
                        </Navbar>

                        {!this.props.user.bearer ?
                            <Login msalContext={this.props.msalContext} /> : null}
                        {/* </UnauthenticatedTemplate> */}
                    </div>}
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    path: state.auth.locPath,
    user: state.auth.user,
    userRegister: state.auth.userRegister
});

const mapDispatchToProps = (dispatch) => ({
    reLogin: (context) => dispatch(AuthActions.reLogin(context)),
});

export const ProfileWithMsal = withMsal(connect(mapStateToProps, mapDispatchToProps)(PageLayout));