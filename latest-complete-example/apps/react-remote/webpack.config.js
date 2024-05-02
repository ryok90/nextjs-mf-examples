const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/**
 * @type {import('webpack').Configuration & { devServer?: import('webpack-dev-server').Configuration }}
 */
const config = {
  entry: './src/index',
  mode: 'development',
  cache: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3012,
    hot: true,
    compress: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3012/',
    uniqueName: 'react_remote',
    clean: false,
  },
  optimization: { minimize: false },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'react_remote',
      filename: `remoteEntry.js`,
      exposes: { './table': './src/components/table/table' },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
        },
        'react/jsx-runtime': {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.ico',
    }),
  ],
};

module.exports = config;
