'use strict'
const path = require('path')
const I18nPlugin = require('@ah/i18n/src/plugins/webpack')
module.exports = {
  mode: 'production',
  // entry: {
  //   app: './test/test.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new I18nPlugin({
      output: path.join(__dirname, './src/i18n/output'),
      type: 'js',
      source: path.join(__dirname, './src/i18n/langs')
    })
  ]
}
