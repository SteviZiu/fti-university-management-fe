import React, { useState } from "react";
import Comments from "./Comments";
import { Button, Col, Form, Row } from "react-bootstrap";


function PostItem(props) {

  const [loveStatus, setLoveStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [postId, setPostId] = useState(props.postId);

  function handleLoveClick(e) {
    if (!props.loveList.filter(e => e.id === props.currentId).length > 0) {
      setLoveStatus(true);
      props.addLove({ commentDto: {id: postId}});
    } else {
      setLoveStatus(false);
      props.addLove({ postId: postId, userId: props.currentId });
    }
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);
  }


  return (
    <div className="border shadow rounded-3 border-primary p-3 mt-3">
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="d-flex flex-column">
            <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
            <div className="text-secondary">{(new Date(props.postDate).toLocaleDateString())}</div>
          </div>
        </div>
        <div className="mx-3">
            <p>{props.content}</p>
        </div>

        {/* Sub-functions of a post */}

        <div className="d-flex justify-content-center align-items-center">
          {/* Sub-function love button */}
          <div className="mx-3">
            <span
              className={`mx-1 fs-4`}
              onClick={handleLoveClick}
            >
              {loveStatus ? (
                <i class="fa-solid fa-heart text-danger"></i>
              ) : (
                <i class="fa-regular fa-heart text-danger"></i>
              )}
            </span>
            <span>
              {props.loveList ? props.loveList.length : null}
            </span>
          </div>

          {/* Sub-function comment button */}
          <div className="mx-3">
            <span
              className={` mx-1 fs-4`}
              onClick={handleCommentButtonClick}
            >
             <i class="fa-solid fa-comments"></i>
            </span>
            <span>
              {props.commentList ? props.commentList.length : null}
            </span>
          </div>
        </div>

        <div className="border rounded border-info my-3 px-2 pb-2">
          <Comments comments={props.commentList} />
        </div>

      </Row>
    </div>
  );
}

export default PostItem;