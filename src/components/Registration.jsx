import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as rs from 'reactstrap';
import AuthActions from "../reducers/AuthActions.js";

class Registration extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { target } = event;
    let obj = {};
    const value = target.type === 'checkbox' ? target.checked : target.value;
    obj[target.id] = value;
    this.props.updateUser(obj);
  };


  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }

  render() {

    return (
      <div className="content">
        <rs.Card className="card-user">
          <rs.CardBody>
            <rs.CardTitle tag="h5">
              Sign In!
            </rs.CardTitle>
            <rs.CardSubtitle
              className="mb-2"
              tag="h7"
            >
              It seems your email is not registred before
            </rs.CardSubtitle>
            <rs.Form className="form" onSubmit={(e) => this.submitForm(e)}>
              <rs.FormGroup>
                <rs.Label>Email/Username</rs.Label>
                <rs.Input
                  disabled={true}
                  name="email"
                  id="exampleEmail"
                  value={this.props.userRegister.username}
                />
              </rs.FormGroup>

              <rs.FormGroup>
                <rs.Label>First Name</rs.Label>
                <rs.Input
                id="name"
                  type="text"
                  value={this.props.user.name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </rs.FormGroup>
              <rs.FormGroup>
                <rs.Label>Last Name</rs.Label>
                <rs.Input
                id="lastName"
                  type="text"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </rs.FormGroup>
              <rs.FormGroup>
                <rs.Label for="gender">
                  Gender
                </rs.Label>
                <rs.Input
                  id="gender"
                  name="select"
                  type="select"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                >
                  <option>
                    Female
                  </option>
                  <option>
                    Male
                  </option>
                </rs.Input>
              </rs.FormGroup>
              <rs.FormGroup>
                <rs.Label for="exampleFile">
                  File
                </rs.Label>
                <rs.Input
                  id="exampleFile"
                  name="file"
                  type="file"
                />
                <rs.FormText>
                  This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                </rs.FormText>
              </rs.FormGroup>
              <div className="update ml-auto mr-auto">
                <rs.Button
                  className="btn-round"
                  color="primary"
                  type="submit"
                  onClick={()=>this.props.register()}
                >
                  Sign In 
                </rs.Button>
              </div>
            </rs.Form>
          </rs.CardBody>
        </rs.Card>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(AuthActions.setPath(path)),
  updateUser: (obj) => dispatch(AuthActions.updateUser(obj)),
  register: () => dispatch(AuthActions.register())
});

const mapStateToProps = (state) => ({
  userRegister: state.auth.userRegister ? state.auth.userRegister : {},
  user: state.auth.user ? state.auth.user : {}
});



Registration = connect(mapStateToProps, mapDispatchToProps)(Registration)
export default Registration;