const path = require('path')
const webpack = require('webpack')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  // entry: {
  //   bundle: path.join(__dirname, './src/index.ts'),
  // },
  target: 'webworker',
  output: {
    filename: `worker.${mode}.js`,
    path: path.join(__dirname, 'dist'),
  },
  context: path.resolve(__dirname, "."),
  mode,
  resolve: {
    alias: {
      fs: path.resolve(__dirname, './null.js'),
    },
    extensions: ['.ts', '.js'],
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  node: {
    net: 'empty',
    tls: 'empty',
    // module: 'empty'
  }
}
