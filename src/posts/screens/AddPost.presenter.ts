import {Navigation} from 'react-native-navigation';

// export const onChangeTitle = (title: string) => {
//   this.setState({title});
//   Navigation.mergeOptions(this.props.componentId, {
//     topBar: {
//       rightButtons: [
//         {
//           id: 'saveBtn',
//           text: 'Save',
//           enabled: !!title,
//         },
//       ],
//     },
//   });
// };
// export const onChangeText = (text: string) => {
//   this.setState({text});
// };
type Obj = {
  componentId: string;
  title: string;
};
export function onChangeTitle({componentId, title}: Obj) {
  Navigation.mergeOptions(componentId, {
    topBar: {
      rightButtons: [
        {
          id: 'saveBtn',
          testID: 'save-post-btn',
          text: 'Save',
          enabled: !!title,
        },
      ],
    },
  });
}
