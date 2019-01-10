const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all"); //If you need multiple paths use the npm package glob-all instead of glob
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
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
    // 修复 HMR(热更新)失效
    config.resolve.symlinks(true);

    //去除无效css
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

    //配置 externals
    config.externals = {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios"
    };

    //生产环境去除console
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }

    //开启gzip
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240, //只处理比这个值大的资源。按字节计算
          minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
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
