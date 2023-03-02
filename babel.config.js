module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [
      ['transform-imports', {
        'react-native-paper': {
          transform: 'react-native-paper/lib/%s',
          preventFullImport: true,
        },
      }],
    ],
  };
};
