var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')

var config = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          'presets': ['react', 'es2015'],
          'plugins': ['transform-object-rest-spread'],
          'env': {
            'development': {
              'plugins': [['react-transform', {
                'transforms': [{
                  'transform': 'react-transform-hmr',
                  'imports': ['react'],
                  'locals': ['module']
                }]
              }]]
            }
          }
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less']
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, '/public')
  }
}

module.exports = config
