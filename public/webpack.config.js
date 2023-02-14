
const path = require('path');
const webpack = require('webpack');

const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname) + '/js/src/entry_prjman.js',
    output: {
        path: path.resolve(__dirname) + '/js/dist',
        filename: 'bundle_prjman.js',
        publicPath: '/app/'
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: '**/node_modules',
    },
 /*   devServer: {*/
      //contentBase: path.resolve(__dirname) + '/js/dist'
      //// contentBase: 'dist'
    /*},*/
    //externals: ['fs'],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(svg|gif|png|eot|woff|ttf)$/,
          use: [
            'url-loader',
          ],
        },
        {
          test: /\.ya?ml$/,
          use: 'js-yaml-loader',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: "file-loader",
          options:{
            name: '[name].[ext]',
            outputPath: 'assets/images/'
            //the images will be emitted to dist/assets/images/ folder
          }
      }
      ]
    },
    plugins: [
/*      new NodemonPlugin({ */
        //watch: path.resolve('./js/dist'),
        //ignore: [
            //'*.js.map',
            //'*.png',
        //],
        //ext: 'js,json',
      /*}),*/
      /* Use the ProvidePlugin constructor to inject jquery implicit globals */
      new webpack.ProvidePlugin({
          $               : "jquery",
          jQuery          : "jquery",
          "window.jQuery" : "jquery",
          "window.$"      : "jquery"
      })
    ]
}
