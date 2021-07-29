const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const isCI = Boolean(process.env.CI || process.env.IS_BUILD_AGENT);

function mockUiLib() {
  const mockUiLib = {
    Assets: {
      icons: {
        tabs: {},
        general: {},
        navigation: {},
        apps: {},
        quickActions: {}
      },
      logos: {},
      illustrations: {}
    },
    Typography: {},
    Colors: {
      rgba: jest.fn()
    },
    Shadows: {
      white30: {},
      white40: {},
      dark20: {bottom: {}},
      sh10: {}
    },
    Constants: {
      isIOS: true
    },
    Ids: {},
    Toast: {
      presets: {}
    },
    BorderRadiuses: {},
    Spacings: {},
    Dividers: {},
    withConnectionState: jest.fn((...args) => args),
    asWixScreen: jest.fn(),
    asConnectedKeyboard: jest.fn(),
    PureBaseComponent: class A {},
    BaseComponent: class A {}
  };
  applyMock('wix-react-native-ui-lib', mockUiLib, true);
}

function mockUiLibAssets() {
  const mockAsset = {
    Assets: {
      icons: {
        tabs: {},
        general: {},
        navigation: {},
        apps: {}
      },
      illustrations: {}
    },
  };
  applyMock('wix-react-native-ui-lib/src', mockAsset, true);
}

function mockPublicUiLib() {
  const publicUiLib = {
    Colors: {},
    PureBaseComponent: class A {},
    BaseComponent: class A {}
  };
  applyMock('react-native-ui-lib', publicUiLib, false)
}

function mockRNWixMedia() {
  const rnWixMedia = {WixMediaApi: jest.fn()};
  applyMock('react-native-wix-media', rnWixMedia, true);
}

function mockRNWixStorage() {
  const mockWixStorage = require('@wix/wix-one-app-storage/src/jest/storage-mock');
  applyMock('wix-one-app-storage', mockWixStorage, true);
}

function mockNativeComponents() {
  const nativeComponents = {
    __esModule: true,
    namedExport: jest.fn(),
    NativeComponents: {
      VideoView: {}
    }
  };
  applyMock('wix-one-app-engine/lib/NativeComponents', nativeComponents);
}

function mockMockTools() {
  try {
    // done specifically to use auto mock
    jest.mock('wix-one-app-engine/lib/MockTools');
  } catch (e) {}
}

function mockAsyncStorage() {
  const asyncStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
  applyMock('@react-native-community/async-storage', asyncStorage)
}

function mockSlider() {
  applyMock('@react-native-community/slider');
}

function mockBlur() {
  applyMock('@react-native-community/blur');
}

function mockAudioToolkit() {
  applyMock('@react-native-community/audio-toolkit');
}

function mockWixStorybookTemplate() {
  applyMock('wix-react-native-storybook-template', {}, true);
}

function mockRecompose() {
  const recompose = {
    compose: () => () => () => {},
    hoistStatics: jest.fn(),
    withProps: jest.fn(),
    withHandlers: jest.fn(),
    withState: jest.fn(),
    lifecycle: jest.fn(),
    renderComponent: jest.fn(),
    branch: jest.fn(),
  };
  applyMock('recompose', recompose);
}

function mockRNNavigation() {
  const navigation = {
    Navigation: {
      setRoot: jest.fn(),
      setDefaultOptions: jest.fn(),
      push: jest.fn(),
      pop: jest.fn(),
      popTo: jest.fn(),
      popToRoot: jest.fn(() => Promise.resolve(true)),
      mergeOptions: jest.fn(),
      showModal: jest.fn(),
      dismissModal: jest.fn(),
      dismissAllModals: jest.fn(),
      showOverlay: jest.fn(),
      dismissOverlay: jest.fn(),
      setStackRoot: jest.fn(),
      registerComponent: jest.fn(),
      setLazyComponentRegistrator: jest.fn(),
      events: jest.fn().mockReturnValue({
        registerBottomTabSelectedListener: () => {
          return {
            remove: jest.fn()
          };
        },
        registerComponentDidAppearListener: () => {
          return {
            remove: jest.fn()
          };
        },
        registerComponentDidDisappearListener: () => {
          return {
            remove: jest.fn()
          };
        },
        registerCommandListener: () => {
          return {
            remove: jest.fn()
          };
        },
        registerNavigationButtonPressedListener: () => ({remove: jest.fn()}),
        componentEventsObserver: {
          listeners: [],
        },
      })
    },
  };
  applyMock('react-native-navigation', navigation);
}

function mockRNNotifications() {
  const rnnotifications = {
    Notifications: {
      postLocalNotification: jest.fn(() => Promise.resolve(true))
    }
  };
  applyMock('react-native-notifications', rnnotifications);
}

function mockRNRedux() {
  const rnredux = {
    connect: () => jest.fn(() => {})
  };
  applyMock('react-redux', rnredux);
}

function mockRNDevtools() {
  const rndevtools = {
    composeWithDevTools: jest.fn()
  };
  applyMock('remote-redux-devtools', rndevtools);
}

function mockRNFS() {
  applyMock('react-native-fs');
}

function mockPromoteMobileCommon() {
  const promoteMobileCommon = {
    createCommonStore: jest.fn(),
    layoutHelper: {getTopContainerWidth: jest.fn()},
    analytics: {actions: {}},
    navigation: {actions: {}},
    utils: {commons: {}},
  };
  applyMock('promote-mobile-common', promoteMobileCommon);
}

function mockWixRNSocial() {
  applyMock('wix-react-native-social', {}, true);
}

function mockRN() {
  const rn = {
    NativeModules: {
      RNMediaManager: {}
    },
    NativeEventEmitter: {},
    Platform: {
      OS: 'ios',
      select: jest.fn(),
      exhaustiveSelect: jest.fn()
    },
    requireNativeComponent: jest.fn(),
    Dimensions: {get: jest.fn(() => ({width: 0, height: 0}))},
    PixelRatio: {get: jest.fn()},
    Alert: {alert: jest.fn()},
    StyleSheet: {create: jest.fn((o) => o), flatten: jest.fn()},
    Animated: {
      timing: jest.fn()
    }
  };
  applyMock('react-native', rn);
}

function mockFirebaseAnalytics() {
  const fbAnalytics = () => {
    return {logEvent: jest.fn()};
  };
  applyMock('@react-native-firebase/analytics', fbAnalytics);
}

function applyMock(moduleName, mockObject = {}, scoped = false, warn = false) {
  try {
    if (scoped) {
      jest.mock(`@wix/${moduleName}`, () => mockObject, {virtual: scoped});
    }
    jest.mock(moduleName, () => mockObject, {virtual: scoped});
  } catch {}
}

function stubGlobals(config) {
  global.engine = {
    createFedops: jest.fn(() => ({
      interactionStarted: jest.fn(),
      appLoadStarted: jest.fn()
    })),
    state: {
      system: {
        app: {
          __value: config.app,
          select: (selector) => selector[config.app](),
          exhaustiveSelect: (selector) => selector[config.app]()
        }
      },
      user: {
        email: 'user@email.com'
      },
      experiments: {
        isEnabled: jest.fn(() => false)
      },
      businesses: {
        onBusinessListChange: jest.fn()
      },
    },
    moduleRegistry: {
      invoke: jest.fn(),
      registeredComponents: {},
      registeredMethods: {},
      hasMethod: jest.fn()
    },
    bi: {
      logger: jest.fn(() => () => {}),
      log: jest.fn()
    }
  };
  global.window = {};
}

describe('Generate module.json', () => {
  let config;

  beforeEach(async () => {
    config = JSON.parse(process.env.MODULE_JSON_CONFIG);
    __DEV__ = true;
  });

  function applyGenericMocks() {
    // TODO: Module specific mocks should be moved to the appropriate modules
    mockUiLib();
    mockUiLibAssets();
    mockPublicUiLib();
    mockRNWixMedia();
    mockRNWixStorage();
    mockNativeComponents();
    mockMockTools();
    mockAsyncStorage();
    mockSlider();
    mockBlur();
    mockAudioToolkit();
    mockWixStorybookTemplate();
    mockRecompose();
    mockRNNavigation();
    mockRNNotifications();
    mockRNRedux();
    mockRNDevtools();
    mockRNFS();
    mockPromoteMobileCommon();
    mockWixRNSocial();

    applyMock('react-native-device-info');
    applyMock('react-native-simple-store');
    applyMock('react-native-share');
    applyMock('react-native-keyboard-input');
    applyMock('react-native-video');

    mockRN();
    mockFirebaseAnalytics();
    stubGlobals(config);
  }

  function applyModuleMocks(moduleName) {
    const modulePath = config.module_roots_map[moduleName];
    if (!modulePath) {
      return;
    }
    const moduleMocksFile = path.resolve(config.module_roots_map[moduleName], 'engineModuleMocks.js');
    if (fs.existsSync(moduleMocksFile)) {
      console.log(`Found additional mocks file for ${moduleName}`);
      const applyMocks = require(moduleMocksFile).applyMocks;
      if (_.isFunction(applyMocks)) {
        try {
          applyMocks();
        } catch {}
      }
    }
  }

  function hasValues(result) {
    return result && _.isArray(result) && result.length > 0;
  }

  function generateModuleJson(moduleName, appName) {
    const module = new (require(`${moduleName}`).default)();
    const prefix = module.prefix();
    const components = module.components && module.components();
    const methods = module.methods && module.methods();
    const observables = module.observables && module.observables();
    const deeplinks = module.deepLinks && module.deepLinks();
    const consumedServices = module.consumedServices && module.consumedServices();
    const providedServices = module.providedServices && module.providedServices();
    const modes = module.modes && module.modes();
    const biSources = module.biSources ? module.biSources() : undefined;
    const dbSchemes = module.dbSchemes ? {[module.prefix()]: module.dbSchemes()} : {};
    return {
      name: moduleName,
      prefix,
      components: hasValues(components) ? components.map((c) => c.id) : undefined,
      methods: hasValues(methods) ? methods.map((m) => m.id) : undefined,
      observables: observables ? Object.keys(observables) : undefined,
      deepLinks: hasValues(deeplinks) ? deeplinks
        .filter((l) => l.apps ? l.apps.includes(appName) : true)
        .map((l) => ({
          linkPattern: l.linkPattern,
          externalPatterns: l.externalPatterns,
          pushNotificationCategories: l.pushNotificationCategories
        })) : undefined,
      hasTabs: !!(module.getTabs) || !!(module.tabs),
      consumedServices: consumedServices ? Object.keys(consumedServices).map((cs) => {
        return _.isFunction(cs) ? cs() : cs;
      }) : undefined,
      providedServices: providedServices ? Object.keys(providedServices).map((ps) => {
        return _.isFunction(ps) ? ps() : ps;
      }) : undefined,
      hasDemoInit: !!(module.__unsafe__initializeDemoModule),
      modes: modes ? Object.keys(modes).filter(m => modes[m].apps ? modes[m].apps.includes(appName) : true) : undefined,
      defaultMode: modes ? Object.keys(modes).find((m) => modes[m].isDefault === true) : undefined,
      biSources,
      dbSchemes
    };
  }

  function writeModuleJson(moduleName, targetFolder, artifactsFolder, moduleJson, appName) {
    fs.writeFileSync(`${targetFolder}/module.${appName}.json`, JSON.stringify(moduleJson || {}, null, 2));
    if (isCI && artifactsFolder) {
      fs.writeFileSync(`${artifactsFolder}/module_js/${moduleName.replace('/', '_')}.${appName}.json`, JSON.stringify(moduleJson || {}, null, 2));
    }
  }

  it('should generate module.json', async () => {
    config.missing_module_names.forEach((moduleName) => {
      applyGenericMocks();
      applyModuleMocks(moduleName);
      const json = generateModuleJson(moduleName, config.app);
      writeModuleJson(moduleName, config.module_roots_map[moduleName], config.artifacts_folder, json, config.app);
    });
  });

});
