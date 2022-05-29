import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";
import AuthActions from "../reducers/AuthActions";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import {withRouter} from '../utils/withRouter';

class CourseSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = this.getInitalState();
    }

    getInitalState() {
        return {
            showModal: false,
        }
    }


    componentDidMount() {
        this.props.setPath("Course Selection");
        this.props.getListAvCourses();
        this.props.getUserCourses();
    }

    showModal(state) {
        this.setState({ showModal: state })
    }

    openModal(id){
        this.props.getCourseComments(id).then(
            this.props.navigate("/courseComments")
        )
    }

    render() {
        // const modal = (
        //     <Modal as={Modal.Dialog} centered show={this.state.showModal} onHide={()=>this.showModal(false)}>
        //         <Modal.Header>
        //             <Modal.Title className="h6">Comments</Modal.Title>
        //             <Button variant="close" aria-label="Close" onClick={()=>this.showModal(false)} />
        //         </Modal.Header>
        //         <Modal.Body>
        //             <Comments comments={this.props.courseComments} />
        //         </Modal.Body>
        //     </Modal>
        // );

        const columns = [{
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
                <Button variant="success" onClick={() => this.openModal(cellContent)}>Comments</Button>
            )
        }];

        let coursesNotRegistred = this.props.courseList ? 
        this.props.courseList.filter(x => !this.props.userCourses.includes(x)) : [];

        return (
            <>
                <div className="content">
                    {/* {modal} */}
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Body>
                                    <BootstrapTable
                                        ref={n => this.node = n}
                                        keyField="id"
                                        data={this.props.courseList ? this.props.courseList : [] }
                                        columns={columns}
                                        //filter={filterFactory()}
                                        //pagination={paginationFactory()}
                                        selectRow={{ mode: 'checkbox', clickToSelect: true }}
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
    courseComments: state.uniManagment.courseComments
});


const mapDispatchToProps = (dispatch) => ({
    setPath: (path) => dispatch(AuthActions.setPath(path)),
    getListAvCourses: () => dispatch(UniManActions.getListAvCourses()),
    getUserCourses: () => dispatch(UniManActions.getUserCourses()),
    getCourseComments: (id)=> dispatch(UniManActions.getCourseComments(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseSearch));