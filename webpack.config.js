const fs = require('fs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AutoPrefixer = require('autoprefixer')
const CompassImageHelperPlugin = require('webpack-compass-imagehelper')

module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    app: [
      path.resolve(__dirname, './src/js/index.js'),
      path.resolve(__dirname, './src/scss/index.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,
    inline: true,
    port: 3000,
    open: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin(),
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img/'),
        to: path.resolve(__dirname, 'dist/img/'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   pngquant: {
    //     quality: '95-100',
    //   },
    // }),
    new CompassImageHelperPlugin({
      targetFile: 'src/scss/images.scss',
      images_path:  path.resolve(__dirname, 'src/img/'),
      pattern: '/**/*',
      css_path: 'images/',
      sizeLimit: 10240, // size limit for image embedding
      prefix: 'icon--'
    })
  ],
}
