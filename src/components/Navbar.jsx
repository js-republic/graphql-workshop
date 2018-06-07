import React, { Component } from "react";
import PostCreationView from "./PostCreationView";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.togglePostCreationView = this.togglePostCreationView.bind(this);
  }

  state = {
    isPostCreationViewVisible: false
  };

  togglePostCreationView() {
    this.setState({
      isPostCreationViewVisible: !this.state.isPostCreationViewVisible
    });
  }

  render() {
    return (
      <nav className="navbar has-shadow" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">GraphBlog.io</a>
          <a className="navbar-item">
            <Toggle
              id="isRest"
              defaultChecked={this.props.isGraphQL}
              onChange={this.props.onSwitch}
            />
            &nbsp;<span>
              {this.props.isGraphQL ? "Mode GraphQL" : "Mode REST"}
            </span>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-primary"
                onClick={() => this.togglePostCreationView()}
              >
                Create post
              </button>
            </div>
          </div>
        </div>
        {this.state.isPostCreationViewVisible && (
          <PostCreationView
            isGraphQL={this.props.isGraphQL}
            makeItDisappear={this.togglePostCreationView}
            onPostCreated={this.props.onPostCreated}
          />
        )}
      </nav>
    );
  }
}

export default Navbar;
