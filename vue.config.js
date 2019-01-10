const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  //允许对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    //配置webpack目录别名alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("view", resolve("src/view"));
  }
};
