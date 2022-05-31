import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from "react-bootstrap";
import Comments from './Comments';

class CourseComments extends PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        let coursecom = this.props.courseComments;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Body>
                                    <div className="border rounded border-info my-3 px-2 pb-2">
                                        <Comments comments={coursecom} />
                                    </div>

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


