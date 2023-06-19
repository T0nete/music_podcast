const path = require( 'path' )
const HtmlWebPackPlugin = require( 'html-webpack-plugin' )
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   mode: 'production',
   context: __dirname,
   entry: './src/index.jsx',
   devtool: 'source-map',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      publicPath: '/',
      filename: 'bundle.js',
   },
   optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            sourceMap: true,
          },
        }),
      ]
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
   // devServer: {
   //    historyApiFallback: true,
   //    open: true,
   // },
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
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          },
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html',
         minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
         }
      }),
      new MiniCssExtractPlugin(),
      new NodePolyfillPlugin()
   ]
};