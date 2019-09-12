const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const projectRoot = path.resolve(__dirname, './');

const { VueLoaderPlugin } = require('vue-loader');

const webpackConfig = {
  mode: 'production',
  entry: ['./src/'],
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage'
            }]
          ],
          comments: false
        },
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'vue-style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
}

const serverConfig = merge(webpackConfig, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-carousel.node.js'
  },
  resolve: {
    mainFields: ['module']
  },
})

const clientConfig = merge(webpackConfig, {
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-carousel.js',
    library: 'VueCarousel',
    libraryTarget: 'umd'
  },
  resolve: {
    mainFields: ['main']
  },
})

module.exports = [ serverConfig, clientConfig ]
