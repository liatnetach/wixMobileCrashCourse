module.exports = () => {
  return {
    autoDetect: true,
    testFramework: {
      configFile: './node_modules/@wix/shono/src/jestConfig/jest-config.js',
    },
  };
};
