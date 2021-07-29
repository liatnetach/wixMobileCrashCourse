import React, {Component} from 'react';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import TextField from 'react-native-ui-lib/textField';
import {Navigation} from 'react-native-navigation';
import * as postsActions from '../../stores/posts/actions';

type Props = {
  componentId: string;
};

class AddPost extends Component<Props, {title: string; text: string}> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      title: '',
      text: '',
    };
  }
  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'saveBtn',
            text: 'Save',
            enabled: false,
          },
        ],
        leftButtons: [
          {
            id: 'cancelBtn',
            text: 'Cancel',
            //icon
          },
        ],
      },
    };
  }
  navigationButtonPressed({buttonId}: {buttonId: string}) {
    if (buttonId === 'saveBtn') {
      this.showSavePost();
    } else if (buttonId === 'cancelBtn') {
      this.showCancelPost();
    }
  }
  showCancelPost() {
    Navigation.dismissModal(this.props.componentId);
  }
  showSavePost() {
    this.showCancelPost();
    const randomImageNumber = Math.floor(Math.random() * 500 + 1);
    postsActions.addPost({
      id: 0,
      title: this.state.title,
      text: this.state.text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
    });
  }
  onChangeTitle = (title: string) => {
    this.setState({title});
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'saveBtn',
            text: 'Save',
            enabled: !!title,
            testID: 'save-btn',
          },
        ],
      },
    });
  };
  onChangeText = (text: string) => {
    this.setState({text});
  };

  render() {
    return (
      <View flex padding-20>
        <Text text30 purple10 center>
          AddPost Screen
        </Text>
        <TextField
          testID="add-title"
          text70
          containerStyle={{marginBottom: 12}}
          floatingPlaceholder
          placeholder="Add a Catchy Title"
          onChangeText={this.onChangeTitle}
          floatOnFocus
        />
        <TextField
          text70
          floatingPlaceholder
          placeholder="This is the beginning of a great post"
          onChangeText={this.onChangeText}
          expandable
        />
      </View>
    );
  }
}

export default AddPost;
