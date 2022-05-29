import React, { Component } from 'react';
import { connect } from "react-redux";
import UniManActions from "../reducers/UniManActions";
import AuthActions from "../reducers/AuthActions";
import {Alert, Card, Col} from "react-bootstrap";

class Notifications extends Component {

  componentDidMount() {
    this.props.setPath("Notifications");
    this.props.getNotifications();
  }

  render() {
    const notifications = this.props.notifications.map((el) => (
      <Alert
        className="alert-with-icon"
        color="info"
        fade={false}
      >
        <span
          data-notify="icon"
          className="nc-icon nc-bell-55"
        />
        <span data-notify="message">
          {el.message}
        </span>
      </Alert>
    ));
    return (
      <div className="content">
        <Col md="12">
          <Card>
            <Card.Body>
              {notifications}
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    notifications: state.uniManagment.notifications,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    setPath: (path) => dispatch(AuthActions.setPath(path)),
    getNotifications: () => dispatch(UniManActions.getNotifications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
