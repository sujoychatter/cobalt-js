var webpack = require('webpack');
module.exports = {
  entry: {bundle : ['webpack-hot-middleware/client', 'webpack/hot/dev-server','./app/cobalt/index.js']},

  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: 'http://localhost:3000/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: [
        'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'
      ]
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  }
}