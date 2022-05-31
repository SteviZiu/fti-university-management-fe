import React, { PureComponent } from 'react';
import { Button, Form, Toast } from "react-bootstrap";
import UniManActions from "../reducers/UniManActions";
import { connect } from 'react-redux';

class PostCompose extends PureComponent {
  constructor(props) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }


  handleContentChange(e) {

    this.props.setPost({ content: e.target.value });
  }


  handleCreatePost(e) {
    e.preventDefault();
    this.props.createPost(this.props.post);
  }

  render() {
    return (
      <div>
        <div className="border rounded-3 border-success p-3 shadow">
          <Toast />
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label>
                <div className="d-flex align-items-center mb-1">
                  <div className="mx-3">
                  <i class="fa-regular fa-face-smile-beam"></i>
                  </div>
                  <div className="fs-4 fw-bold">{this.props.user.userDto.name +" "+ this.props.user.userDto.lastName}</div>
                </div>
              </Form.Label>
              <Form.Control
                as="textarea"
                row={4}
                placeholder="What is happening?"
                value={this.props.post.content}
                onChange={this.handleContentChange}
                style={{ resize: "none", height: "7rem" }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end align-items-center">
              <Button
                onClick={this.handleCreatePost}
                variant="success"
                className="col-2 mx-3"
              >
                Post
              </Button>
            </div>
          </Form>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPost: (content) => dispatch(UniManActions.setPost(content)),
  createPost: (post) => dispatch(UniManActions.createPost(post))

});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  post: state.uniManagment.post,

});

export default connect(mapStateToProps, mapDispatchToProps)(PostCompose)
