import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AuthActions from "../reducers/AuthActions";
import bcg from "../img/damir-bosnjak.jpg"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class Profile extends PureComponent {
  constructor(props) {
    super(props);
  this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.props.setPath("Profile");
    //this.props.requestProfileData(this.props.msalContext.instance, this.props.msalContext.accounts[0]);
    this.props.setUserModified(this.props.userLogged);
  }

  handleChange = (event) => {
    const { target } = event;
    let obj = {};
    const value = target.type === 'checkbox' ? target.checked : target.value;
    obj[target.id] = value;
    this.props.updateUserModified(obj);
  };

  render() {
    return (
      <>
        <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={bcg}
                />
              </div>
              <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                      />
                    </a>
                  </div>
                  <h5 className="title">{this.props.user.name}  {this.props.user.lastName}</h5>
                </CardBody>
              </Card>
              </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pl-1" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="Email" type="email"
                            value={this.props.user.email}
                            disabled={true} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            value={this.props.user.name}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            value={this.props.user.lastName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Gender</label>
                          <Input
                            id="gender"
                            type="select"
                            value={this.props.user.gender}
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          >
                            <option value="0">
                              Female
                            </option>
                            <option value="1">
                              Male
                            </option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Birthday</label>
                          <Input
                            id="exampleDatetime"
                            name="datetime"
                            type="datetime"
                            value={this.props.user.birthday}

                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          onClick={()=> this.props.updateProfile()}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(AuthActions.setPath(path)),
  requestProfileData: (instance, profile) => dispatch(AuthActions.requestProfileData(instance, profile)),
  setUserModified: (user) => dispatch(AuthActions.setUserModified(user)),
  updateProfile: () => dispatch(AuthActions.updateProfile()),
  updateUserModified: (obj) =>dispatch(AuthActions.updateUserModified(obj)),
});

const mapStateToProps = (state) => ({
  userLogged: state.auth.user ? state.auth.user.userDto : {},
  user: state.auth.userModified ? state.auth.userModified : {}
});

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile)
export default (Profile);

