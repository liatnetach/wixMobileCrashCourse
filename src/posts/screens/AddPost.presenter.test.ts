import * as Presenter from './AddPost.presenter';
import {Navigation} from 'react-native-navigation';
import * as postsActions from '../../stores/posts/actions';

jest.mock('react-native-navigation');
jest.mock('../../stores/posts/actions');

describe('AddPost presenter', () => {
  const mockedTitle: string = 'this is a mocked title';
  const mockedText: string = 'this is a mocked text';
  const mockedCompId: string = 'mock-componentId';
  afterEach(() => {
    jest.resetModules();
  });
  it('should enable the save button if title is not blank', () => {
    Presenter.onChangeTitle({componentId: mockedCompId, title: mockedTitle});
    expect(
      Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled,
    ).toBeTruthy();
  });

  it('should not enable the save button if title is blank', () => {
    Presenter.onChangeTitle({componentId: mockedCompId, title: ''});
    expect(
      Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled,
    ).not.toBeTruthy();
  });
  it('should dismiss the modal when clicking on save', () => {});
  it('should call add post action when clicking on save', () => {});
});
