module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "envName": "REACT_APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
