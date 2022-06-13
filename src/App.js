import React, { PureComponent, useEffect, useNavigate } from 'react';
import { ProfileWithMsal } from "./components/PageLayout";
import { Routes, Route, Navigate,Outlet  } from "react-router-dom";
import { Redirect } from 'react-dom';
import routes from "./utils/routes";
import { connect } from "react-redux";
import Registration from './components/Registration';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';
import CourseComments from './components/CourseComments';
import { MsalAuthenticationTemplate, withMsal, UnauthenticatedTemplate } from "@azure/msal-react";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends PureComponent {
    render() {
        const CustomWrapper = ({ isLoggedIn, ...props }) => {
            return isLoggedIn ? (
                <Outlet />
            ) : (
                <Navigate
                    to={`/`}
                    replace
                />
            )
        };

        return (
            <div role="document" key='main'>
                <div className={this.props.user.bearer ? "main-panel" : ""}>
                    <Loader promiseTracker={usePromiseTracker} />
                    <ProfileWithMsal />
                    <Routes>
        
                        <Route path='/' element={<Login msalContext={this.props.msalContext} />} />

                        {routes.map((prop, key) => {
                            return (
                                <Route path={prop.path} element={<CustomWrapper isLoggedIn={this.props.user.bearer} />} >
                                    <Route path={prop.path} element={prop.component} />
                                </Route>
                            );
                        })}

                        <Route path="/registration" element={<Registration />} />
                        <Route path="/courseComments" element={<CourseComments />} />

                    </Routes>

                </div >
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    userRegister: state.auth.userRegister
});



export default withMsal(connect(mapStateToProps, null)(App));