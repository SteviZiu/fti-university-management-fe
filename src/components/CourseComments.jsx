import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";
import AuthActions from "../reducers/AuthActions";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Comments from './Comments';

class CourseComments extends PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <div className="content">
                    {/* {modal} */}
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Body>
                                <Comments comments={this.props.courseComments} />
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
    courseComments: state.uniManagment.courseComments

});


const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CourseComments);


