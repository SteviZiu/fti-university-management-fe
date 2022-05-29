import React, { PureComponent } from 'react';
import { ProfileWithMsal } from "./components/PageLayout";
import { Routes, Route} from "react-router-dom";
import {Redirect } from 'react-router'
import routes from "./utils/routes";
import { connect } from "react-redux";
import Registration from './components/Registration';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';
import CourseComments from './components/CourseComments';

class App extends PureComponent {
    render() {
        
        return (
            <div role="document" key='main'>
                <div className={this.props.user.bearer ? "main-panel" : ""}>
                <Loader promiseTracker={usePromiseTracker} />
                <ProfileWithMsal />
                    <Routes>
                        {routes.map((prop, key) => {
                            return (
                                <Route
                                    path={prop.path}
                                    element={prop.component}
                                />
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



export default connect(mapStateToProps, null)(App);