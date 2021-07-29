import {postsStore, Post} from './store';

describe('posts store', () => {
  const posts: Post[] = [
    {
      id: 666,
      title: 'Test',
      text: 'Im testing the store!!',
      img: 'https://picsum.photos/200/200/?image=977',
    },
    {
      id: 555,
      title: 'Second Test',
      text: 'Im testing the store- 2!!',
      img: 'https://picsum.photos/200/200/?image=979',
    },
  ];
  const addedPost: Post = {
    id: 4,
    title: 'added post',
    text: 'Im adding new post to the existing one',
    img: 'https://picsum.photos/200/200/?image=999',
  };
  it('should have an initial state without any posts', () => {
    expect(postsStore.getPosts()).toEqual([]);
  });
  it('should set posts', () => {
    postsStore.setPosts(posts);
    expect(postsStore.getPosts()).toEqual(posts);
  });
  it('should add a post', () => {
    postsStore.addPost(addedPost);
    expect(postsStore.getPosts()).toEqual([...posts, addedPost]);
  });
  it('should delete a post', () => {
    postsStore.deletePost(555);
    expect(postsStore.getPosts()).toEqual([posts[0], addedPost]);
  });
});
