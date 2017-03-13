var webpack = require('webpack');
var argv = require('yargs').argv;
argv.env = argv.env || "browser";
var env = argv.env === "browser" ? "browser" : "device";
var autoprefixer = require('autoprefixer');
global.Promise = require('bluebird');

var devPlugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development")
  })
];

var prodPlugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: true
  })
];

//noinspection JSUnresolvedFunction
module.exports = {
  entry: './src/index.ts',
  devtool: !argv.production && "inline-source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
  },
  plugins: argv.production ? prodPlugins : devPlugins,
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ["ts-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  postcss: function(){
    return [autoprefixer];
  },
  output: {
    path: "./dist",
    publicPath: "",
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd"
  },
  target: 'node'
};
