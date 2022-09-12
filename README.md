## 手动配置webpack, 搭建项目 React v17.0.2
---
- npm init -y
### 1. 安装 webpack, webpack-cli
### 2. 安装本地启动服务
```js
 - yarn add webpack webpack-cli -D
 - yarn add webpack-dev-server -D
// serve, build 是 webpack-cli 命令
"scripts": {
  "start": "webpack-cli serve",
  "build": "webpack-cli build",
}
```
---
### 3. 安装 react 核心依赖, 安装插件
```js
 - 安装插件, 引入 html 模板文件
 - yarn add html-webpack-plugin -D
 - yarn add clean-webpack-plugin -D
 
 - yarn add react react-dom react-router-dom -D
 - yarn add babel-loader @babel/core @babel/preset-env
 - 安装 babel:
 - 1. 解析 jsx 语法
 - 2. 将 ES6 -> ES5
 - 报错: babel-loader: Support for the experimental syntax 'jsx' isn't currently enabled(不支持jsx语法,需要单独的处理jsx的插件)
 - 解决办法: yarn add @babel/preset-react -D
```
---

### 4. 加载资源: 图片/css/font/文件等
- webpack > 5, webpack内置的资源模块 (asset module)
  - https://webpack.docschina.org/guides/asset-modules/
- webpack < 5
  - yarn add url-loader file-loader -D
  - yarn add style-loader css-loader less less-loader -D
- yarn add mini-css-extract-plugin -D // 将css单独打包
- yarn add css-minimizer-webpack-plugin -D // 打包时压缩css
- yarn add postcss-loader autoprefixer -D  // 预处理css, 增加css前缀
- yarn add webpack-merge -D // 合并配置文件
```js
  module: {
    rules: [
      // webpack5
      { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      // webpack4
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // use: 'url-loader',
        use: {
          loader: 'url-loader',
          // 当文件小于这个限制时,使用 url-loader 将图片的格式编译成base64格式
          // 当文件超过这个限制时,使用 file-loader 来编译，并且打包到dist文件夹下面
          options: {
            limit: 8192
          }
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
```

### 5. 安装antd, 按需引入antd样式
- yarn add antd babel-plugin-import -D
```js
"babel": { // package.json 文件中增加以下配置
  "plugins": [ // .babelrc 文件中增加以下配置
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css", // true 会加载 less 
      }
    ]
  ]
}
```
### optimization.splitChunks, 代码分割
- 同步加载的模块：通过 import xxx或require('xxx')加载的模块
- 异步加载的模块：通过import('xxx')或require(['xxx'],() =>{})加载的模块
```js
// 异步加载
// import('@/styles/index.less')
// require(['@/styles/index.less'], () => {
//   console.log('async 加载');
// })
// 同步加载
import "@/styles/index.less";
// require('@/styles/index.less')
```
------------------------
### 使用react-router-dom后, 跳转后刷新页面出现404
```js
// 开发环境下
devServer = {
  historyApiFallback: true, // 没有配置output.publicPath的情况下
  historyApiFallback: {     // 配置了output.publicPath: '/asset/'
    index: '/assets/'
  },
}
// 生产环境下, 配置 nginx
server {
  ...
  location / {
    try_files $uri /index.html
  }
}
```
------------------------
### 增加主题配置, 利用 antd 的 ConfigProvider
```js
// 第一步引入antd样式变量文件
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.less';
// 第二步利用 ConfigProvider 修改主题变量的颜色
const themeHandle = (themeColor) => {
  ConfigProvider.config({
    theme: {
      primaryColor: themeColor,
      ... // 当然这里还可以修改其他的颜色, 比如阴影等等, 具体看antd官网 https://ant.design/docs/react/customize-theme-cn
    }
  });
}
```
------------------------
### 增加国际化配置 [react-i18next](https://github.com/i18next/react-i18next)
>利用上面的 antd 的 ConfigProvider,也可以配置国际化, 但是只能翻译 antd 组件库, 如果想要翻译自定义的就不太好做;

>其实正确的做法应该是两个同时使用, 达到整个网站一键切换的效果.
- yarn add i18next react-i18next 
```js
// 1. 类组件
import { withTranslation } from 'react-i18next';
class SzjComponent extends React.Component{
  // 利用高阶组件, 将 国际化的方法暴露在 自定义组件的 props中
  constructor () {
    const { t, i18n } = this.props;
  }
}
export default withTranslation()(SzjComponent)
// 2. 函数式组件
import { useTranslation } from 'react-i18next';
export default () => {
  // 利用国际化的hook
  const { t, i18n } = useTranslation();
}
// 3. 直接使用国际化自带的标签 Trans
import { Trans } from 'react-i18next';
<Trans i18nKey="user.desc">整句翻译</Trans>

// 国际化的文件在 /src/locale/xxx
- i18n.js // 配置文件
- zh      // 中文翻译, 配置
- en      // 英文翻译, 配置
// 使用方式如下:
i18n.changeLanguage('en'); // 修改语言
<div>标题: {t("title")}, 我的名字: {t("user.name")}</div>
```
------------------------
### 接入 redux-saga
- yarn add redux-saga
```js
```
------------------------

### 接入百度地图API - [baiduKey](https://lbs.baidu.com/index.php?title=jspopularGL/guide/getkey)
```js
// 1, html中增加百度地图api, 我的密钥: 
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=您的密钥"></script>
// - 注意: 直接使用浏览器会报警告(网速好时不影响页面), 2G网的时候会阻止这个js执行(因为chrome Version > 55时,限制document.write写入插件)
// - 解决: 
// <script>
//   // 拿到上面链接的返回, 手动挂载
//   (function(){
//     window.BMAP_PROTOCOL = "https";
//     window.BMapGL_loadScriptTime = (new Date).getTime();
//     var hs = document.createElement("script");
//     hs.src = "https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak={baiduKey}&services=&t=20220224113913";
//     var s = document.getElementsByTagName("script")[0]; 
//     s.parentNode.insertBefore(hs, s);
//     var hl = document.createElement("link");
//     hl.type = "text/css";
//     hl.rel="stylesheet";
//     hl.href = "https://api.map.baidu.com/res/webgl/10/bmap.css";
//     s.parentNode.insertBefore(hl, s)
//   })();
// </script>
// 或者
// <script>window.BMAP_PROTOCOL = "https";window.BMapGL_loadScriptTime = (new Date).getTime();</script>
// <script src="https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak={baiduKey}&services=&t=20220224113913"></script>
// <link rel="stylesheet" href="https://api.map.baidu.com/res/webgl/10/bmap.css">

********************
// * 异步加载
import React, { Component } from 'react';
import MapApiLoaderHOC from 'react-bmapgl/Map/MapApiLoaderHOC'
// 异步加载JSAPI的高阶组件，在业务组件中使用，从而实现将JSAPI以异步形式插入
// 而不是提前放到`index.html`模板里。
export default function WithBaiDuMap (WrappedComponent) {
  class NewComponent extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  NewComponent.displayName = "WithBaiDuMap"; // 给组件重命名
  return MapApiLoaderHOC({ ak: {baiduKey} })(NewComponent)
}
// * 按需引入
import Map from 'react-bmapgl/Map'
import Marker from 'react-bmapgl/Overlay/Marker'

// 2, 安装 react 组件库
yarn add react-bmapgl
// 3. 使用,请查看 /src/pages/maps
```

### 


---
[baiduKey]:"gIKfppDoOay3qLXTgbT2aZUprumFU2Cf"