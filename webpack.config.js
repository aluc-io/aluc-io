const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')
const packageJson = require('./package.json')
const _ = require('lodash')

console.log(slsw.lib.entries)

module.exports = {
  entry: _.isEmpty(slsw.lib.entries) ? { handler: './handler.js'} : slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  //mode: 'development',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/env",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'static/favicon', to: 'static/favicon' },
    ]),
  ],
  target: 'node',
  externals: ['aws-sdk'],
}
