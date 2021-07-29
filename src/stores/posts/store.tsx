import * as remx from 'remx';

type State = {
  posts: Post[];
};
const initialState: State = {
  posts: [],
};
export type Post = {
  id: number;
  title: string;
  text: string;
  img: string;
};
const state = remx.state(initialState);

const setters = remx.setters({
  setPosts(posts: Post[]) {
    state.posts = posts;
  },
  addPost(post: Post) {
    state.posts = [...state.posts, post];
  },
  deletePost(id: number) {
    const newArr = state.posts.filter(post => post.id !== id);
    state.posts = newArr;
  },
});

const getters = remx.getters({
  getPosts() {
    return state.posts;
  },
});

export const postsStore = {
  ...setters,
  ...getters,
};
