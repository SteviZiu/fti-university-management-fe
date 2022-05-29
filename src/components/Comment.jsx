import CommentForm from "./CommentBox";
import React, { PureComponent } from 'react';
import logo from '../img/user-image.png';

const Comment = ({
  comment,
  replies,
  addComment,
  parentId = null,
}) => {
  
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={logo} width="30" height="30"/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userDto.name}</div>
          <div style= {{marginTop: "9px", fontSize:"12px"}}>{createdAt}</div>
        </div>
         <div className="comment-text">{comment.comment}</div>
      
        <div className="comment-actions">
            <div
              className="comment-action"
            >
              Reply
            </div>
        
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
    
        {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
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

