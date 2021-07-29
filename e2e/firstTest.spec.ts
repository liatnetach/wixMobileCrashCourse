import {expect, device, element, by} from 'detox';
describe('posts', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should display the posts list on app launch', async () => {
    await expect(element(by.id('posts-list'))).toBeVisible();
  });
  it('should display a post', async () => {
    await element(by.id('show-post5')).tap();
    await expect(element(by.id('post-showed'))).toBeVisible();
  });
  it('should add a post', async () => {
    await element(by.id('add-topBar')).tap();
    await element(by.id('add-title')).typeText('TitleP');
    await element(by.id('save-btn')).tap();
  });
  it('should delete a post', async () => {});
  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('welcome'))).toBeVisible();
  // });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
// import {driver} from './firstTest.driver';
// import {MockServerApi} from '../src/posts/api.e2e';
// import {device, expect} from 'detox';
// detox.init();
// describe('Posts', () => {
//   beforeAll(async () => {
//     await device.launchApp();
//   });

//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });

//   afterEach(() => {
//     MockServerApi.reset();
//   });

//   it('should display the posts list on app launch', async () => {
//     await expect(driver.get.postsList()).toBeVisible();
//   });

//   it('should display the first post in the list', async () => {
//     const postId = 1;

//     await driver.when.pressOnPost(postId);
//     await expect(driver.get.postTitle()).toHaveText('Post 1');
//     await expect(driver.get.postText()).toHaveText('post 1 text');
//   });

//   it('should add a post', async () => {
//     const newPost = {
//       title: 'New Post Title',
//     };

//     await driver.when.pressOnAddPostBtn();
//     await driver.when.typeTitle(newPost.title);
//     await driver.when.pressOnSave();
//     await driver.when.scrollToBottom();
//     await driver.when.pressOnPost(9);

//     await expect(driver.get.postTitle()).toHaveText(newPost.title);
//   });

//   it('should delete a post', async () => {
//     await driver.when.scrollToBottom();
//     await driver.when.pressOnPost(2);
//     await driver.when.pressOnDeletePost();
//     await driver.when.scrollToBottom();

//     await expect(driver.get.post(2)).toBeNotVisible();
//   });

//   it('should update a post', async () => {
//     const postId = 1;

//     await driver.when.pressOnPost(postId);
//     await driver.when.pressOnEditPostBtn();
//     await driver.when.typeTitle('-updated');
//     await driver.when.pressOnSave();

//     await expect(driver.get.postTitle()).toHaveText('Post 1-updated');
//     await expect(driver.get.postText()).toHaveText('post 1 text');
//   });
// });
