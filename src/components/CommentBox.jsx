import React, { PureComponent } from 'react';

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);
    this.setText = this.setText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = this.getInitalState();
  }

  getInitalState() {
    return {
      text: "",
    }
  }

  setText(txt) {
    this.setState({ text: txt });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.text);
    this.setText("");
  };

  render() {
    const isTextareaDisabled = this.state.text.length === 0;

    return (
      <form onSubmit={this.onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={this.state.text}
          onChange={(e) => this.setText(e.target.value)}
        />
        <button className="comment-form-button" disabled={isTextareaDisabled}>
          {this.props.submitLabel}
        </button>

      </form>
    );
  };
}

export default CommentForm;