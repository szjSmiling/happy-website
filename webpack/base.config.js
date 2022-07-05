const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const resolve = (_path) => path.resolve(__dirname, _path);

const baseConfig = {
  entry: resolve("../src/index.js"),
  output: {
    path: resolve("../dist"),
    filename: "js/[name].[contenthash:8].js", // 给打包后的入口js文件命名
    chunkFilename: "js/chunk-[name].[chunkhash:8].js", // 给打包后的非入口js文件命名
    assetModuleFilename: "images/[contenthash:8][ext][query]",
    publicPath: '/', // 不加会出现 favicon.ico 404
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader, // css 默认打包在js中, 单独抽离.css文件
          // "style-loader", // 从 JS 中创建样式节点
          "css-loader", // 转化 CSS 为 CommonJS
          "postcss-loader",
          {
            loader: "less-loader", // 编译 Less 为 CSS
            options: {
              lessOptions: {
                // modifyVars: { // 要想生效必须 按需引入的 style: true
                //   "primary-color": "#25b864",
                // },
                javascriptEnabled: true, // 内联JavaScript启用, 解决报错: AntDesign .bezierEasingMixin()； ^ Inline JavaScript is not enabled
              },
            },
          },
        ],
      },
      {
        // webpack5, 加载资源 https://webpack.docschina.org/guides/asset-modules/
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve('../src/'),
      '@components': resolve('../src/components/'),
      '@pages': resolve('../src/pages/'),
    },
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "手动搭建React",
      filename: "index.html", // default index.html, 可以自定义文件名字
      template: resolve("../public/index.html"),
      // 这里列出可能要手动加入html中的js文件, 自定义字段, 如: bundle: 'bundle.js'
      // html中使用 <script type="javascript/text" src="<%=htmlWebpackPlugin.options.bundle %>"></script>
      // chunks: 'all',
      favicon: resolve('../public/favicon.ico')
    }),
    new MiniCssExtractPlugin({ // 将css整合到一个css文件, html里面不会出现很多link css标签
      linkType: 'text/css', // 允许加载带有自定义链接类型的异步块，例如<link type="text/css" src="" />
      filename: 'css/[name].[contenthash:8].css'
    })
  ],
};

module.exports = {
  resolve,
  baseConfig
}
