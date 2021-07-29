import type {Module} from 'wix-one-app-engine';

export default class DemoModule implements Module {
  __unsafe__initializeDemoModule() {
    try {
      const MockTools = require('wix-one-app-engine/lib/MockTools');
      const loginMode = MockTools.getLoginMode();
      if (loginMode === 'quickLogin') {
        setQuickLoginData();
      }
    } catch (error) {
      console.error('failed to set quickLoginData', error);
    }
  }

  components() {
    return [
      {
        id: 'finalApp.demo.Demo',
        generator: () => require('./Demo').default,
      }
    ];
  }

  methods() {
    return [];
  }

  prefix() {
    return 'finalApp.demo';
  }

  tabs() {
    const Assets = require('@wix/wix-react-native-ui-lib').Assets;
    return [{
      id: 'demo-tab',
      label: 'demo',
      biLabel: 'demo',
      screen: 'finalApp.demo.Demo',
      icon: Assets.icons.general.fullScreen,
      selectedIcon: Assets.icons.general.fullScreen,
      title: 'Demo',
      testID: 'finalApp.demo.DEMO_TAB',
    }];
  }
}

function setQuickLoginData() {
  const MockTools = require('wix-one-app-engine/lib/MockTools');
  const { credentials } = require('./credentials');
  MockTools.setLoginData({ loginCredentials: credentials });
}
