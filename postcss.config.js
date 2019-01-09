module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["> 0.01%", "Android >= 4.0", "Ios >= 8.0"]
    },
    //更多配置参考：https://github.com/ant-tool/postcss-plugin-px2rem
    "postcss-plugin-px2rem": {
      rootValue: 750 / 16,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [
        "border-bottom",
        "border-top",
        "border-left",
        "border-right",
        "border",
        "filter"
      ],
      selectorBlackList: ["ignore"],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    //更多配置参考：https://github.com/crossjs/postcss-flexible
    "postcss-flexible": {
      remUnit: 750 / 16,
      threeVersion: false,
      remVersion: true,
      baseDpr: 2,
      remPrecision: 6,
      dprList: [2, 3]
    }
  }
};
