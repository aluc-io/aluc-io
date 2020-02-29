const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')
const packageJson = require('./package.json')
const _ = require('lodash')

console.log(slsw.lib.entries)
const MMDB_DIR = path.dirname(process.env.ALUCIO_MMDB_PATH)

const entries = {}
Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['source-map-support/register', slsw.lib.entries[key]])
)

module.exports = {
  entry: entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  devtool: 'source-map',
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
    new CopyPlugin([
      { from: MMDB_DIR, to: MMDB_DIR }
    ]),
  ],
  target: 'node',
  externals: ['aws-sdk'],
}
