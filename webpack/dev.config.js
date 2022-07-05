const { merge } = require('webpack-merge');

const { resolve, baseConfig } = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: "inline-source-map",
  stats: {
    // webpack5, 优化控制台展示信息
    modules: false, // 是否添加关于构建模块的信息
  },
  devServer: {
    // host: 'localhost',
    // port: 8080,
    // // hot: true, // 默认开启热更新
    // open: true
    historyApiFallback: true
  },
  plugins: [

  ]
})

