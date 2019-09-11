const path = require('path');
const projectRoot = path.resolve(__dirname, './');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: ['./src/'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-carousel.js',
    library: 'VueCarousel',
    libraryTarget: 'umd'
  },
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
  plugins: [new VueLoaderPlugin()]
}
