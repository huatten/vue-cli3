/*
 * https://github.com/staven630/vue-cli3-config
 * https://juejin.im/post/5c4a6fcd518825469414e062?utm_source=gold_browser_extension#heading-3
 * https://juejin.im/post/5c3c544c6fb9a049d37f5903
 * https://juejin.im/post/5c403bcaf265da61587765c9
 */
const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all"); //If you need multiple paths use the npm package glob-all instead of glob
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境
const IS_GZIP = true; //是否开启Gzip压缩
const resolve = dir => path.join(__dirname, dir);

// cdn预加载使用
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios"
};

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js",
      "https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js",
      "https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js",
      "https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"
    ]
  }
};

module.exports = {
  publicPath: "./",
  chainWebpack: config => {
    // 目录别名alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("store", resolve("src/store"))
      .set("icons", resolve("src/icons"))
      .set("view", resolve("src/view"));

    //添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });

    // 压缩图片
    config.module
      .rule("images")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true
      })
      .end();

    // 打包分析
    process.env.NODE_ENV === "analyz" &&
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);

    //svg-sprite-loader配置
    const svgRule = config.module.rule("svg"); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      //去除无效css
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync(
            [
              path.join(__dirname, "./src/index.html"),
              path.join(__dirname, "./**/*.vue"),
              path.join(__dirname, "./src/**/*.js")
            ],
            { nodir: true }
          ),
          only: ["bundle", "vendor"]
        })
      );
      //生产环境去除console
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false, //在UglifyJs删除没有用到的代码时不输出警告
              drop_console: true, // 删除所有的 `console` 语句
              collapse_vars: true, // 内嵌定义了但是只用到一次的变量
              reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      //开启Gzip压缩
      if (IS_GZIP) {
        plugins.push(
          new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
          })
        );
      }
      config.plugins = [...config.plugins, ...plugins];
    }

    //cdn引用时配置externals
    IS_PROD
      ? (config.externals = externals)
      : (config.devServer = {
          disableHostCheck: true
        });
  },
  css: {
    // 是否使用css分离插件
    extract: true,
    loaderOptions: {
      // 配置scss全局变量
      sass: {
        data: `@import "@/assets/scss/variable.scss";` //!!!切记;不能丢
      }
    }
  }
};
