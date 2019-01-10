const path = require("path");
// https://www.npmjs.com/package/purgecss-webpack-plugin
const PurgecssPlugin = require("purgecss-webpack-plugin");
//If you need multiple paths use the npm package glob-all instead of glob
const glob = require("glob-all");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    //配置webpack目录别名alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("view", resolve("src/view"));
  },
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, "./src/index.html"),
            path.join(__dirname, "./**/*.vue"),
            path.join(__dirname, "./src/**/*.js")
          ])
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
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
