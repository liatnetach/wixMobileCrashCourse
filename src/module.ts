import type {Module} from 'wix-one-app-engine';
import {startLoadingFirstComponent} from './posts/screens/FirstWidget';
export default class FinalAppModule implements Module {
  prefix(){
    return 'liat-first-module';
  }
  components() {
    return [
      {
        id: 'liat-first-module.screen.PostsList',
        generator: () => require('./posts/screens/PostsList').default,
      },
      {
        id: 'liat-first-module.screen.AddPost',
        generator: () => require('./posts/screens/AddPost').default,
      },
      {
        id: 'liat-first-module.screen.ViewPost',
        generator: () => require('./posts/screens/ViewPost').default,
      },
      {
          id: 'liat-first-module.screen.FirstWidget',
          generator: () => require('./posts/screens/FirstWidget').default,
      },
    ];
  }

  methods() {
    return [];
  }

  consumedServices() {
    const {Assets} = require('@wix/wix-react-native-ui-lib');
    return {
       'wix.platform.dashboardWidgetsService': [{
        id: 'liat-first-module.screen.FirstWidget',
        displayName: 'Liat First widget',
        componentId: 'liat-first-module.screen.FirstWidget',
        startLoadingComponent: startLoadingFirstComponent,
        permission: 'does_not_exist',
      }],
      quickActions: [
        {
          id: 'add-post-quick_action',
          label: 'Click Here to Reach Your Screen',
          icon: Assets.icons.general.arrowRight,
          screenId: 'liat-first-module.screen.AddPost',
          testID: 'add-post-quick_action',
        },
      ],
    };
  }
 
  tabs() {
    const {Assets} = require('@wix/wix-react-native-ui-lib');
    return [
      {
        id: 'welcome',
        label: 'Welcome Tab',
        biLabel: 'welcome tab',
        screen: 'liat-first-module.screen.PostsList',
        icon: Assets.icons.general.fullScreen,
        selectedIcon: Assets.icons.general.fullScreen,
        title: 'Welcome',
        testID: 'liat-first-module.test.PostsList',
      },
    ];
  }


}
