module.exports = {
  plugins: [
    [
      require("autoprefixer")({
        overrideBrowserslist: [ // 必须配置支持的浏览器版本, 不然不生效
          "defaults",
          "Android 4.1",
          "iOS 7.1",
          "Chrome>31",
          "ff>31",
          "ie>=8",
          "last 2 versions",
          ">0%",
        ],
      }),
    ],
  ],
};
