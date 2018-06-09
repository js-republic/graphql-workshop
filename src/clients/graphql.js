import axios from "axios";

export async function getPosts(limit, offset) {
  const {
    data: {
      data: { posts }
    }
  } = await axios.post("/graphql", {
    query: `
      query getPosts {
        posts {
          id,
          title
          content
          comments {
            id
            content
          }
        }
      }
    `
  });
  return posts;
}

export async function addNewPost(newPost) {
  await axios.post("/graphql", {
    query: `mutation createPost($newPost: PostInput) {
      createPost(newPost: $newPost) {
        id
        title
        content
      }
    }`,
    variables: {
      newPost
    }
  });
}

export async function addNewComment(comment, postId) {
  const {
    data: {
      data: { createComment }
    }
  } = await axios.post("/graphql", {
    query: `mutation createComment($postId:ID!, $content: String!) {
      createComment(postId: $postId, content: $content) {
        id
        content
      }
    }`,
    variables: {
      postId,
      content: comment.content
    }
  });
  return createComment;
}
