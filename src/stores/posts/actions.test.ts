import {Post, postsStore as mockedStore} from './store';
import * as postsActions from './actions';
import * as ServerApi from './api';
import {mocked} from 'ts-jest/utils';

jest.mock('./store');
jest.mock('./api');

describe('posts actions', () => {
  require('jest-fetch-mock').enableMocks();

  const mockPosts: Post[] = [
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
  const mockPost = {
    id: 11,
    title: 'Post 3',
    text: 'Post 3 text',
    img: 'https://picsum.photos/200/200/?image=977',
  };

  beforeEach(() => {
    // mockStore = require('./store').postsStore;
    // const mockFetchPosts = jest.fn().mockResolvedValue(mockPosts);
    // const mockAddPost = jest
    //   .fn()
    //   .mockImplementation(post => Promise.resolve({...post, id: 11}));
    // jest.mock('./api', () => ({
    //   fetchPosts: mockFetchPosts,
    //   addPost: mockAddPost,
    //   deletePost: jest.fn(),
    //   //updatePost: jest.fn(),
    // }));
  });

  it('should fetch posts', async () => {
    mocked(ServerApi.fetchPosts).mockResolvedValue(mockPosts);
    await postsActions.fetchPosts();
    expect(mockedStore.setPosts).toHaveBeenCalledWith(mockPosts);
  });

  it('should add a post', async () => {
    mocked(ServerApi.addPost).mockResolvedValue(mockPost);
    await postsActions.addPost(mockPost);
    expect(mockedStore.addPost).toHaveBeenCalledWith(mockPost);
  });
  it('should delete a post', async () => {
    mocked(ServerApi.deletePost).mockResolvedValue();
    await postsActions.deletePost(11);
    expect(mockedStore.deletePost).toHaveBeenCalledWith(11);
  });
});
