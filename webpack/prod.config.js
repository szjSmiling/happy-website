const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { resolve, baseConfig } = require("./base.config.js");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  performance: {
    // hints: "error"
  },
  stats: {
    assets: false,
    modules: false
  },
  optimization: {
    minimize: true, // 开发环境开启css优化
    minimizer: [
      // 生产环境开启css优化
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "async",
      name: false,
      minSize: 30000,
      maxSize: 30000,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      cacheGroups: {
        vendors: { // 第三方模块
          name: `chunk-vendors`,
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/, // 用来匹配要提取的模块的资源路径或名称。值是正则或函数
          // minSize: 1024*224, // 超过29.3KB会报警告
          // minChunks: 1,
          priority: -10,
        },
        commons: { // 公共的模块
          name: `chunk-commons`,
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        antd: {
          name: 'ant-design',
          chunks: 'all',
          test: /[\\/](antd|@ant-design)[\\/]/,
          minChunks: 1,
          priority: 0,
          reuseExistingChunk: true,
        }
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      // dry: true, // 模拟删除, 不确定下面配置对不对时可以开启
      verbose: true, // 在控制台输出删除的文件日志
      // leanStaleWebpackAssets: false, // 构建时自动移除所有未使用的webpack资源
      // protectWebpackAssets: false,
      // 忽略掉不需要删除的文件，相当于exclude,被忽略的文件需要在开头加上 "!"号，数组中必须带有"**/*"通配符
      // cleanOnceBeforeBuildPatterns: ["**/*", resolve('./dist')]
    }),
    new BundleAnalyzerPlugin(),
  ],
});
