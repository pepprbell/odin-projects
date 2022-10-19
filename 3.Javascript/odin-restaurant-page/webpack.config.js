const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  entry: './src/calendar.js',
  output: {
    filename: 'calendar.js',
    path: path.resolve(__dirname, 'dist'),
  },
};