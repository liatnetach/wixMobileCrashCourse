import {Post} from './store';
const url = 'http://localhost:3000/posts';

export async function fetchPosts() {
  const response = await fetch(url);
  const posts = await response.json();
  return posts;
}

export async function addPost(post: Post) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToAdd = await response.json();
  return postToAdd;
}

export async function deletePost(id: number) {
  await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}
