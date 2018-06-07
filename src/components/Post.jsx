import React, { Component } from "react";
import CommentsSection from "./CommentsSection";
import ReactMarkdown from "react-markdown";
import * as graphql from "../clients/graphql";
import * as rest from "../clients/rest";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.onComment = this.onComment.bind(this);
  }
  async componentDidMount() {
    await this.loadComments(this.props);
  }

  async loadComments(props) {
    this.setState(
      props.isGraphQL
        ? { comments: props.post.comments || [] }
        : { comments: await rest.getCommentsFor(props.post.id) }
    );
  }

  async onComment(content) {
    const client = this.props.isGraphQL ? graphql : rest;
    const newComment = await client.addNewComment(
      { content },
      this.props.post.id
    );
    const comments = this.state.comments.concat(newComment);
    this.setState({ comments });
  }
  render() {
    const post = this.props.post;
    return (
      <div className="post">
        <div className="post-body mb-1">
          <h2 className="is-size-2 has-text-weight-semibold">
            {post && post.title}
          </h2>
          <ReactMarkdown source={post && post.content} />
          <small className="has-text-weight-semibold">
            {post && post.author}
          </small>
        </div>
        <CommentsSection
          onComment={this.onComment}
          comments={this.state.comments}
        />
      </div>
    );
  }
}

export default Post;
