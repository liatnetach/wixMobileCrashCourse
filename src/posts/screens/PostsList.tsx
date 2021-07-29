import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  Text,
  ListItem,
  Colors,
  BorderRadiuses,
  Image,
} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import * as postsActions from '../../stores/posts/actions';
import {postsStore, Post} from '../../stores/posts/store';
import {connect} from 'remx';

type Props = {
  componentId: string;
  posts: [];
};
class PostsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.pushViewPostScreen = this.pushViewPostScreen.bind(this);
    Navigation.events().bindComponent(this);
  }
  pushViewPostScreen = (post: Post) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          post: post,
        },
        options: {
          topBar: {
            title: {
              text: `Post ${post.id}`,
            },
          },
        },
      },
    });
  };
  renderItem = ({item}: {item: Post}) => (
    <ListItem
      activeBackgroundColor={Colors.purple70}
      activeOpacity={0.1}
      height={77.5}
      testID={`show-post${item.id}`}
      onPress={() => this.pushViewPostScreen(item)}>
      <ListItem.Part left>
        <Image source={{uri: item.img}} style={styles.image} />
      </ListItem.Part>
      <ListItem.Part
        middle
        column
        containerStyle={[styles.border, {paddingRight: 17}]}>
        <ListItem.Part containerStyle={{marginBottom: 3}}>
          <Text dark10 text70 style={styles.text} numberOfLines={1}>
            {item.title}
          </Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text style={styles.text} text90 dark40 numberOfLines={1}>
            {item.text}
          </Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );

  postKeyExtractor = (item: Post) => `${item.id}-key`;

  componentDidMount() {
    postsActions.fetchPosts();
  }

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add',
            testID: 'add-topBar',
          },
        ],
      },
    };
  }

  navigationButtonPressed({buttonId}: {buttonId: string}) {
    if (buttonId === 'addBtn') {
      this.showAddPost();
    }
  }
  showAddPost() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'blog.AddPost',
            },
          },
        ],
      },
    });
  }
  render() {
    return (
      <FlatList
        data={this.props.posts}
        testID="posts-list"
        keyExtractor={item => `{key-${item.id}`}
        renderItem={this.renderItem}
      />
    );
  }
}
function mapStateToProps() {
  return {
    posts: postsStore.getPosts(),
  };
}

export default connect(mapStateToProps)(PostsList);
const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
});
