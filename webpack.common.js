const path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "build"),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/i,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: {
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      }
    ]
  }
};
