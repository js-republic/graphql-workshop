import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import * as restClient from "./clients/rest";
import * as graphQLClient from "./clients/graphql";

class App extends Component {
  constructor() {
    super();
    const isGraphQL = localStorage.getItem("BOW_isGraphQL") === "1";
    this.state = { posts: [], isGraphQL };
    localStorage.setItem("BOW_isGraphQL", isGraphQL ? "1" : "O");
    this.onSwitch = this.onSwitch.bind(this);
    this.onPostCreated = this.onPostCreated.bind(this);
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  async loadPosts() {
    const client = this.state.isGraphQL ? graphQLClient : restClient;
    this.setState({ posts: (await client.getPosts()) || [] });
  }

  onSwitch() {
    this.setState(
      {
        isGraphQL: !this.state.isGraphQL
      },
      () => {
        localStorage.setItem("BOW_isGraphQL", this.state.isGraphQL ? "1" : "O");
        location.reload(); //eslint-disable-line
      }
    );
  }

  async onPostCreated() {
    await this.loadPosts();
  }

  render() {
    return (
      <div className="App has-text-dark">
        <Navbar
          isGraphQL={this.state.isGraphQL}
          onSwitch={this.onSwitch}
          onPostCreated={this.onPostCreated}
        />
        <Feed isGraphQL={this.state.isGraphQL} posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
