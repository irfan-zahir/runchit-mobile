module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      'react-native-reanimated/plugin',
      require.resolve("expo-router/babel"),
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@hooks': './hooks', // if app files is inside "app/" folder, replace with "./app"
            '@typings': './typings',
            '@providers': './providers',
            '@screens': './screens',
            '@navigation': './navigation',
            '@rtk': './rtk',
            '@components': './components',
            '@svgs': './svgs',
            '@api': './api',
            '@configs': './configs',
            '@constants': './constants',
          }
        }
      ],
      [
        "module:react-native-dotenv",
        {
          "moduleName": "react-native-dotenv",
          // "path": ".env.production",
          "verbose": false
        }
      ]
    ],
  };
};
