import axios from "axios";

export async function getPosts() {
  const resp = await axios.get("/rest/posts");
  return resp.data;
}

export async function addNewPost(newPost) {
  await axios.post("/rest/posts", newPost);
}

export async function getCommentsFor(postId) {
  const resp = await axios.get(`/rest/posts/${postId}/comments`);
  return resp.data;
}

export async function addNewComment(comment, postId) {
  const resp = await axios.post(`/rest/posts/${postId}/comments`, comment);
  return resp.data;
}
