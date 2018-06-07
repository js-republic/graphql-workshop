import React, { Component } from "react";

class CommentsSection extends Component {
  state = {
    comment: ""
  };

  comment() {
    this.props.onComment(this.state.comment);
    this.setState({
      comment: ""
    });
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  render() {
    return (
      <div className="comments-section">
        <div className="comments-feed p-1">
          {this.props.comments.map(comment => (
            <div className="comment mb-1" key={comment.id}>
              <h3 className="has-text-weight-semibold">Un internaute</h3>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="comments-section-form">
          <input
            className="input is-small is-rounded mr-1"
            type="text"
            placeholder="What is on your mind about it?"
            value={this.state.comment}
            onChange={event => this.handleChange(event)}
          />
          <button
            className="button is-small is-primary"
            onClick={() => this.comment()}
          >
            Comment
          </button>
        </div>
      </div>
    );
  }
}

export default CommentsSection;
