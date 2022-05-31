import React from 'react';
import { Route, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);

        this.componentName = "[PrivateRoute.jsx] ";
    }

    render() {
        const { element: Component, ...rest } = this.props;
        console.log(this.componentName + "render [utente]  " + this.props.user);
        return (
/*
            <Route {...rest} render={(props) => (
                this.props.utente
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
*/
            // FIX ADV360 per il cambio PASSWORD
            
            <Route {...rest} render={(props) => (
                this.props.user.bearer
                    ? 
                        <Component {...props} />
                    : <Navigate  to={'/'} />
            )} />

        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(PrivateRoute);
