import {postsStore, Post} from './store';
import * as ServerApi from './api';

export async function fetchPosts() {
  const posts = await ServerApi.fetchPosts();
  postsStore.setPosts(posts);
}

export async function addPost(post: Post) {
  const postToAdd = await ServerApi.addPost(post);
  postsStore.addPost(postToAdd);
}

export async function deletePost(id: number) {
  await ServerApi.deletePost(id);
  postsStore.deletePost(id);
}
