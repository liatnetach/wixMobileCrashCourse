import React, {PureComponent} from 'react';
import {View, Text, Colors, Button} from '@wix/wix-react-native-ui-lib';

let shouldFail = false;
export function startLoadingFirstComponent() {
  if (shouldFail) {
    return new Promise((_resolve, reject) => {
      setTimeout(() => reject(new Error('failed to load first component')), 1000);
    });
  } else {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
export default class FirstWidget extends PureComponent {
  render() {
    return (
      <View flex center bg-red30 height={300}>
        <Text color={Colors.grey10}>
          Dashboard without a title
        </Text>
        <Button label="Toggle component loading failure on/off" onPress={() => shouldFail = !shouldFail} />
      </View>
    );
  }
}