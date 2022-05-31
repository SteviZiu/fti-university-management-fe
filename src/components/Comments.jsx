import React, { PureComponent } from 'react';
import CommentForm from "./CommentBox";
import Comment from "./Comment";
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";


class Comments extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getInitalState();
    }

    getInitalState() {
        return {
            activeComment: null,
        }
    }

    render() {

        const setActiveComment = (obj) => {
            this.setState({activeComment: obj})
        }
        const addComment = (text, parentId) => {
            this.props.createComment(text, parentId);
            setActiveComment(null)
        }
        return (
            <div className="comments">
                <h3 className="comments-title">Comments</h3>
                <div className="comment-form-title">Write comment</div>
                <CommentForm submitLabel="Write" handleSubmit={addComment} />
                <div className="comments-container">
                    {this.props.comments && this.props.comments.map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={rootComment.replies}
                            addComment={addComment}
                            activeComment={this.state.activeComment}
                            setActiveComment={setActiveComment}
                        />
                    ))}
                </div>
            </div>
        );

    }
}
const mapStateToProps = (state) => ({

});


const mapDispatchToProps = (dispatch) => ({
    createComment: (text, parentId) => dispatch(UniManActions.createComment(text, parentId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);