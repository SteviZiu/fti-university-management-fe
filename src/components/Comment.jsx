import CommentForm from "./CommentBox";
import React from 'react';
import logo from '../img/user-image.png';

const Comment = ({
  comment,
  replies,
  addComment,
  parentId = null,
  activeComment,
  setActiveComment
}) => {

  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={logo} width="30" height="30" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userDto.name}</div>
          <div style={{ marginTop: "9px", fontSize: "12px" }}>{createdAt}</div>
        </div>
        <div className="comment-text">{comment.comment}</div>

        <div className="comment-actions">
          <div
            className="comment-action"
            onClick={() =>
              setActiveComment({ id: comment.id, type: "replying" })
            }
          >
            Reply
          </div>

          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )}

          {replies && replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  addComment={addComment}
                  parentId={comment.id}
                  replies={reply.replies}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

