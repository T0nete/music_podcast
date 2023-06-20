const path = require( 'path' )
const HtmlWebPackPlugin = require( 'html-webpack-plugin' )
const Dotenv = require('dotenv-webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   mode: 'development',
   context: __dirname,
   entry: './src/index.jsx',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      publicPath: '/',
      filename: 'bundle.js',
   },
   resolve: {
      alias: {
          components: path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx'],
      fallback: {
         stream: require.resolve('stream-browserify')
       }
  },
   devServer: {
      historyApiFallback: true,
      open: true,
   },
   module: {
      rules: [
         {
            test: /\.js$|jsx/,
            use: 'babel-loader',
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      }),
      new Dotenv(),
      new NodePolyfillPlugin()
   ]
};