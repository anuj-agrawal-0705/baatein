const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common,{
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: "./public",
        watchContentBase: true
      }

})