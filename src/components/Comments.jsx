import React, { PureComponent } from 'react';
import CommentForm from "./CommentBox";
import Comment from "./Comment";
import { connect } from 'react-redux';
import UniManActions from "../reducers/UniManActions";


class Comments extends PureComponent {

    render() {
        const addComment = (text, parentId) => {
            this.props.createCommentApi(text, parentId);
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
    createComment: () => dispatch(UniManActions.createComment()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);