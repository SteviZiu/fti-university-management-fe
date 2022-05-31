import React, { Component } from 'react';
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";
import { Card, Row, Modal, Button, Col } from "react-bootstrap";
import logo from '../img/user-image.png';

function Friend(props) {
    const { friend, remove, addFriend, openCourses, status } = props
    return (
        <li>
            <Row>
                <Col md="1" xs="1">
                    <div className="avatar">
                        <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={logo}
                        />
                    </div>
                </Col>
                <Col md="4" xs="4">
                <div className="fs-4 fw-bold">{friend.name+" "+friend.lastName}</div>
                </Col>
                <Col  md="7" xs="7">
                    {status == "FRIENDS" ? (<span>
                        <Button className="btn-round"
                            color="danger"
                            outline
                            size="sm"
                            onClick={() => remove(friend.id)} >
                            Remove Friend   </Button>
                        <Button className="btn-round"
                            color="info"
                            outline
                            size="sm"
                            onClick={() => openCourses(friend.id)} >
                            See Courses  </Button></span>) : status == "PENDING" ? (<span>
                                <Button className="btn-round"
                                    color="succses"
                                    outline
                                    size="sm"
                                    onClick={() => addFriend(friend.id)}>Accept Request</Button>
                                <Button className="btn-round"
                                    color="danger"
                                    outline
                                    size="sm"
                                    onClick={() => remove(friend.id)} >
                                    Remove Request   </Button></span>) : null}
                </Col>
            </Row>
        </li >
    )
}

class Friendship extends Component {
    constructor(props) {
        super(props)

        this.showModal = this.showModal.bind(this);
        this.state = this.getInitalState();
    }

    getInitalState() {
        return {
            showModal: false
        }
    }

    componentDidMount() {
        this.props.getFriends();
        this.props.getFriendReq();
    }

    showModal() {
        this.setState({ showModal: !this.state.showModal })
    }

   

    render() {
        const friends = this.props.friends.filter((el) => {
            if (el.sender.id != this.props.user.id && el.friendshipStatus == "FRIENDS") {
                return { friend: el.sender, status: el.friendshipStatus }
            } else if (el.receiver.id != this.props.user.id && el.friendshipStatus == "FRIENDS") {
                return { friend: el.receiver, status: el.friendshipStatus }
            }
        });

        const reqFriends = this.props.friendReq.filter((el) => {
            if (el.receiver.id == this.props.user.id && el.friendshipStatus == "PENDING") {
                return el
            }
        });

        const modal = (
            <Modal as={Modal.Dialog} centered show={this.state.showModal} onHide={() => this.showModal()}>
                <Modal.Header>
                    <Modal.Title className="h6">Student Courses</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={() => this.showModal()} />
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>

            </Modal>
        );

        const openCourses = (friendId) => {
            this.props.getUserCourses(friendId).then(
                this.showModal()
            )
        }
    
        const addFriend = (id) => {
            let obj = {
                id: id, friendshipStatus: 0
            }
            this.props.respondFriend(obj);
        }
    
        const removeFriend = (id)=>{
            let obj = {
                id: id, friendshipStatus: 2
            }
            this.props.respondFriend(obj);
        }

        return (
            <div className="content">
                <Card>
                    <Card.Header>
                        <h2>Active Friends</h2>
                    </Card.Header>
                    <Card.Body>
                        {friends.length > 0 ?
                            <ul className="list-unstyled team-members">
                                {friends.map(el => <Friend key={el.friend.name} friend={el.friend} remove={removeFriend} status={el.friendshipStatus} />)}
                            </ul> : "There are no elements to show at this moment!"}
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        <h2>Pending Requests</h2>
                    </Card.Header>
                    <Card.Body>
                        {reqFriends.length > 0 ?
                            <ul className="list-unstyled team-members">
                                {reqFriends.map(el => <Friend key={el.sender.name} friend={el.sender} activate={addFriend} status={el.friendshipStatus} />)}
                            </ul> : "There are no elements to show at this moment!"}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({

    getFriends: () => dispatch(UniManActions.getFriends()),
    getFriendReq: () => dispatch(UniManActions.getFriendReq()),
    respondFriend: (obj) => dispatch(UniManActions.respondFriend(obj)),
    getUserCourses: (id) => dispatch(UniManActions.getUserCourses(id)),
});

const mapStateToProps = (state) => ({
    user: state.auth.user.userDto,
    friends: state.uniManagment.friends,
    friendReq: state.uniManagment.friendReq,

});

export default connect(mapStateToProps, mapDispatchToProps)(Friendship)

