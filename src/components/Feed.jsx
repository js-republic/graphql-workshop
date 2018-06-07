import React from "react";
import Post from "./Post";

const Feed = ({ posts, isGraphQL }) => {
  return (
    <section className="feed-container section">
      <div className="tile is-ancestor has-content-centered">
        <div className="tile is-parent is-6 is-vertical">
          {posts.map((post, i) => (
            <div key={i} className="tile is-child box is-12 is-primary">
              <Post post={post} isGraphQL={isGraphQL} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feed;
