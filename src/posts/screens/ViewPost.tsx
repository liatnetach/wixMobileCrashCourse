import React from 'react';
import Button from 'react-native-ui-lib/button';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import {NavigationComponent, Navigation} from 'react-native-navigation';
import {deletePost} from '../../stores/posts/actions';
type Props = {
  componentId: string;
  post: {title: string; text: string; img: string; id: number};
};
class ViewPost extends NavigationComponent<Props> {
  onPostDeletePressed = async () => {
    try {
      await deletePost(this.props.post.id);
    } catch (err) {
      //
    }
    Navigation.pop(this.props.componentId);
  };
  render() {
    return (
      <View flex spread padding-24 testID="post-showed">
        <View>
          <Text text30 purple10>
            {this.props.post.title}
          </Text>
          <Text text70 dark20 marginT-12>
            {this.props.post.text}
          </Text>
        </View>
        <Button
          label="Delete Post"
          text80
          red70
          bg-red20
          enableShadow
          borderRadius={10}
          onPress={this.onPostDeletePressed}
        />
      </View>
    );
  }
}
export default ViewPost;
