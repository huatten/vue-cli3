const path = require("path");
const resolve = dir => path.join(__dirname, dir);
//const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
  chainWebpack: config => {
    //配置webpack目录别名alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("view", resolve("src/view"));
  },
  css: {
    loaderOptions: {
      // 配置scss全局变量
      sass: {
        data: `@import "@/assets/scss/variable.scss";` //!!!切记;不能丢
      }
    }
  }
};
