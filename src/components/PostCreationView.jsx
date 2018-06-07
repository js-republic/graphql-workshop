import React, { Component } from "react";
import * as graphql from "../clients/graphql";
import * as rest from "../clients/rest";

class PostCreationView extends Component {
  state = {
    author: "",
    title: "",
    content: "",
    isCreateBtnDisabled: true
  };

  componentDidMount() {
    const { author, title, content } = this.state;

    if (!this.state.author && !this.state.title && !this.state.content) {
      this.makeCreateBtnEnabled();
    }
  }

  handleChange(event, fieldType) {
    const { author, title, content } = this.state;

    this.setState({
      [fieldType]: event.target.value
    });
  }

  makeCreateBtnEnabled() {
    this.setState({
      isCreateBtnDisabled: false
    });
  }

  async createPostGQL() {
    const { title, content } = this.state;
    const client = this.props.isGraphQL ? graphql : rest;
    await client.addNewPost({ title, content });
    this.props.makeItDisappear();
    this.props.onPostCreated();
  }

  render() {
    return (
      <div
        className="post-creation-view-overlay"
        onClick={() => this.props.makeItDisappear()}
      >
        <div
          className="post-creation-view-body has-shadow"
          onClick={event => event.stopPropagation()}
        >
          <label htmlFor="title">Title</label>
          <input
            className="input mb-1"
            name="title"
            type="text"
            placeholder="What does it talk about?"
            onChange={event => this.handleChange(event, "title")}
          />
          <label htmlFor="content">Content</label>
          <textarea
            className="textarea mb-1"
            name="content"
            id="post-creation-view-content"
            cols="30"
            rows="10"
            placeholder="Once upon a time..."
            onChange={event => this.handleChange(event, "content")}
          />
          <div>
            <button
              className="button is-primary"
              disabled={this.state.isCreateBtnDisabled}
              onClick={() => this.createPostGQL()}
            >
              Create post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCreationView;
