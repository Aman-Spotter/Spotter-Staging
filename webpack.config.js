const path = require('path');
// const WorkerPlugin = require('worker-plugin');
// const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js'],
    modules: ['src', 'node_modules'],
    alias: {
      apollo: path.resolve(__dirname, 'src/apollo/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
};
