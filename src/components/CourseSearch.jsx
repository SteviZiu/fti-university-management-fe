import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";
import AuthActions from "../reducers/AuthActions";
import { Card, Row, Col, Modal, Button, Alert } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { withRouter } from '../utils/withRouter';

class CourseSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateSelectedList = this.updateSelectedList.bind(this);
        this.joinCourse = this.joinCourse.bind(this);
        this.state = this.getInitalState();
    }

    getInitalState() {
        return {
            showModal: false,
            selectedCourses: [],
            courseId: null
        }
    }


    componentDidMount() {
        this.props.setPath("Course Selection");
        this.props.getListAvCourses();
        this.props.getUserCourses(this.props.user.id);
    }

    showModal(state) {
        this.setState({ showModal: state })
    }

    openComments(id) {
        this.props.getCourseComments(id).then(
            this.props.navigate("/courseComments")
        )
    }

    openModal(id) {
        this.setState({courseId: id});
        this.showModal(true);
    }

    dropCourse() {
        this.props.dropCourse(this.state.courseId).then(
            this.showModal(false)
        )
    }

    joinCourse(id){
        this.props.joinCourse(id).then(
            reject => { return (
                <Alert variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                       {reject}
                    </p>
                </Alert>)
            }
        )
    }

    updateSelectedList(row, isSelect, index) {
        let courses = [];
        if (isSelect) {
            this.setState(previousState => {
                return {
                    selectedCourses: [...previousState.selectedCourses, row]
                };
            });
        } else {
            courses = this.state.selectedCourses.splice(index, 1)
            this.setState({ selectedCourses: courses })

        }
        return this.state.selectedCourses
    }

    render() {
        const modal = (
            <Modal as={Modal.Dialog} centered show={this.state.showModal} onHide={() => this.showModal(false)}>
                <Modal.Header>
                    <Modal.Title className="h6">Confirm Drop</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={() => this.showModal(false)} />
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure you want to drop this course?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>this.dropCourse()}>
                        Yes
                    </Button>
                    <Button variant="warning"  onClick={() => this.showModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        const col1 = [
            {
                dataField: 'name',
                text: 'Course Name'
            },
        {
            dataField: 'description',
            text: 'Description'
        },
        {
            dataField: 'startTime',
            text: 'Start Time'
        },
        {
            dataField: 'endTime',
            text: 'End Time'
        },
        {
            text: 'Comments',
            dataField: 'id',
            formatter: (cellContent, row) => (
                <Button variant="success" onClick={() => this.openComments(cellContent)}>Comments</Button>
            )
        },
        {
            text: 'Drop Course',
            fieldPath: 'drop',
            formatter: (cellContent, row) => (
                    <a onClick={() => this.openModal(row.id)}><i class="fa-solid fa-trash" style={{ fontSize: '1.5em', color: 'red' }}></i></a>
            )
            }
        ];

        const col2 = [
            {
                text: 'Join Course',
                fieldPath: 'join',
                formatter: (cellContent, row) => (
                    <div style={{marginLeft:"30px"}}>
                    <a onClick={() => this.joinCourse(row.id)}><i class="fa-solid fa-circle-plus" style={{ fontSize: '1.5em', color: 'green' }}></i></a>
                    </div>
                )
            },{
            dataField: 'name',
            text: 'Course Name'
        },
        {
            dataField: 'description',
            text: 'Description'
        },
        {
            dataField: 'startTime',
            text: 'Start Time'
        },
        {
            dataField: 'endTime',
            text: 'End Time'
        },
        {
            text: 'Comments',
            dataField: 'id',
            formatter: (cellContent, row) => (
                <Button variant="success" onClick={() => this.openComments(cellContent)}>Comments</Button>
            )
        }
        ];
        
        let coursesNotRegistred = this.props.courseList ?
            this.props.courseList.content ? this.props.courseList.content.filter(x => !this.props.userCourses.includes(x)) : [] : [];

        return (
            <>
                <div className="content">
                    {modal}
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <h5>Select among the courses</h5>
                                </Card.Header>
                                <Card.Body>
                                    <BootstrapTable
                                        ref={n => this.node = n}
                                        keyField="id"
                                        data={this.props.courseList ? this.props.courseList : []}
                                        columns={col2}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <h5>Courses already Registred</h5>
                                </Card.Header>
                                <Card.Body>
                                    <BootstrapTable
                                        ref={n => this.node = n}
                                        keyField="id"
                                        data={this.props.userCourses ? this.props.userCourses : []}
                                        columns={col1}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

}


const mapStateToProps = (state) => ({
    courseList: state.uniManagment.courseList ? state.uniManagment.courseList.content : [],
    userCourses: state.uniManagment.userCourses,
    courseComments: state.uniManagment.courseComments,
    user: state.auth.user.userDto
});


const mapDispatchToProps = (dispatch) => ({
    setPath: (path) => dispatch(AuthActions.setPath(path)),
    getListAvCourses: () => dispatch(UniManActions.getListAvCourses()),
    getUserCourses: (id) => dispatch(UniManActions.getUserCourses(id)),
    getCourseComments: (id) => dispatch(UniManActions.getCourseComments(id)),
    dropCourse: (id) => dispatch(UniManActions.dropCourse(id)),
    joinCourse:  (id) => dispatch(UniManActions.joinCourse(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseSearch));