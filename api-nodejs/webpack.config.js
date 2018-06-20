const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  entry: [
    path.join(__dirname, 'src/lambda.js')
  ],
  // Specify the output file containing our bundled code
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  target: 'node',
  plugins: [
    new ZipPlugin()
  ]
}