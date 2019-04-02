# vue-cli3 移动端从0到1搭建配置
<span id="top">目录</span>

- [√ 安装 @vue/cli并初始化](#install)
- [√ 添加别名 alias](#alias)
- [√ 配置 externals和cdn开关](#externals)
- [√ 去除生产环境的 console.log](#console)
- [√ 图片压缩](#tiny)
- [√ 开启Gzip压缩](#gzip)

### <span id="install">☞ 安装@vue/cli并初始化</span>
```
npm install -g @vue/cli
```
等待安装完成后开始初始化项目
```
vue create vue-cli3
```
1.选择预设<br/>
&emsp;&emsp;可以选择默认预设，默认预设包含了 `babel`,`eslint`;<br/>
&emsp;&emsp;这里我选择的是更多功能 `Manually select features`，回车以后选择你需要的插件<br/>

2.选择插件<br/>
&emsp;&emsp;这边选择了 `Babel`、`Router`、`Vuex`、`cCSS Pre-processors`【css预处理器】、`Linter/Formatter`【格式检查】、`Unit Testing`【Unit测试框架】

3.路由模式选择<br/>
&emsp;&emsp;是否使用 `history` 模式的路由 (No)，这里我选的是 `hash`模式的路由

4.选择一个css预处理器<br/>
&emsp;&emsp;这里我选择的是Sass/SCSS

5.选择一个eslint配置<br/>
&emsp;&emsp;这边选择 ` ESLint + Standard config`，个人比较喜欢这个代码规范

6.选择什么时候进行eslint校验<br/>
&emsp;&emsp;选择 `Lint on save` 保存时候检查<br/>
&emsp;&emsp;如果你这边选择的是vscode编辑器，可以配置eslint插件进行代码自动格式化<br/>

7.选择测试框架<br/>
&emsp;&emsp;这里我选择 `Mocha + Chai`，当然你也可以选择 `Jest`<br/>

8.选择将这些配置文件写入到什么地方<br/>
&emsp;&emsp;这里我选择 `In dedicated config files`（独立文件放置），当然你也可以选择 `In package.json`（package.json放置）<br/>

9.是否保存这份预设配置？<br/>
&emsp;&emsp;选Y的话，下次创建一个vue项目，可以直接使用这套预设配置文件，而无需再进行配置<br/>
[▲ 返回顶部](#top)

### <span id="alias">☞ 添加别名 alias</span>
修改默认的webpack配置， 在项目根目录创建vue.config.js，代码如下：
```
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境
const resolve = dir => path.join(__dirname, dir);

module.export = {
  chainWebpack: config =>{
    //添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("store", resolve("src/store"))
      .set("icons", resolve("src/icons"))
      .set("view", resolve("src/view"));
  }
}
```
[▲ 返回顶部](#top)

### <span id="externals">☞ 配置 externals和cdn开关</span>
正常情况下，项目中的依赖包，如 vue, vue-router, axios, lodash, echarts等这样的包，都是直接从node_modules目录中打包进项目中，无形中增加了打包后的文件体积。<br/>
我们可以利用webpack提供的externals节点，将上述包配置成外联的形式，防止将某些 import 的包打包到bundle中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
```
// vue.config.js

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境
const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV); //是否开发环境
const IS_OPENCDN = true; // 是否开启cdn
const externalsConfig = {
  // dns预加载，优化接口请求
  dnsPrefetch: ["http://sinacloud.net"],
  // cdn预加载使用
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios"
  },
  cdn: {
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
  }
};
module.export = {
  chainWebpack: config => {
    //添加CDN参数到htmlWebpackPlugin配置中， 可在public/index.html 修改
    config.plugin("html").tap(args => {
      if (IS_PROD && IS_OPENCDN) {
        args[0].cdn = externalsConfig.cdn.build;
      }
      if (IS_DEV) {
        args[0].cdn = externalsConfig.cdn.dev;
      }
      // dns预加载
      args[0].dnsPrefetch = externalsConfig.dnsPrefetch;
      return args;
    });
  },
  configureWebpack: config => {
    //生产环境npm包转CDN
    if (IS_PROD) {
      IS_OPENCDN && (config.externals = externalsConfig.externals);
    } else {
      //关闭host check
      config.devServer = {
        disableHostCheck: true
      };
    }
  }
}

// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="hotcss" content="design-width=750">
    <meta name="renderer" content="webkit|chrome">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- dns-prefetch，在vue.config.js配置 -->
    <% for (var i in htmlWebpackPlugin.options.dnsPrefetch) { %>
      <link rel="dns-prefetch" href="<%= htmlWebpackPlugin.options.dnsPrefetch[i] %>">
    <% } %>
    <!-- CDN css，在vue.config.js配置 -->
    <% for (var i in htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style">
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet">
    <% } %>
     <!-- 预加载的使用CDN加速的JS文件-->
    <% for (var i in htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.js[i] %>" rel="preload" as="script">
    <% } %>
    <title>vue-cli3</title>
  </head>
  <body>
    <div id="app"></div>
      <!-- CDN js，在vue.config.js配置 -->
    <% for (var i in htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>

```
[▲ 返回顶部](#top)
### <span id="console">☞ 去除生产环境的console.log</span>
console.log用于向开发控制台打印一条消息，常用来在开发时候调试分析，有时候在开发的时候可能需要打印一些对象信息，但是在发布的时候忘记去掉console语句，这可能会造成一定的内存泄漏，在传递给console.log的对象是不能被垃圾回收的，因为在代码运行之后需要在开发工具能查看对象信息，所以最好不要在生产环境中console.log任何对象。<br/>

这里可以借助与webpack的 `UglifyJsPlugin` 插件来去除console.log，插件的更多配置[点这里](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
```
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境

module.export = {
  configureWebpack: config =>{
   if(IS_PROD){
     const plugins = [];
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
      config.plugins = [...config.plugins, ...plugins];
   }
  }
}
```
[▲ 返回顶部](#top)
### <span id="tiny">☞ 图片压缩</span>
1.安装 `image-webpack-loader`
```
npm install image-webpack-loader --save-dev
```
2.下面的配置代码做了两件事：一是压缩，二是转Base64
```
module.export = {
  chainWebpack: config =>{
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
  }
}
```
[▲ 返回顶部](#top)
### <span id="gzip">☞ 开启Gzip压缩</span>
gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度。html、js、css文件甚至json数据都可以用它压缩，可以减小60%以上的体积，具体可以自行去搜索或者[点这里](https://segmentfault.com/a/1190000012571492)。<br/>
webpack在打包时可以借助  `compression-webpack-plugin` 实现gzip压缩。<br/>

1.安装 `compression-webpack-plugin` 插件
```
npm install compression-webpack-plugin --save-dev
```
2.Vue.config.js配置
```
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境
const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV); //是否开发环境
const IS_GZIP = true; //是否开启Gzip压缩

module.export = {
  configureWebpack: config =>{
    if(IS_PROD &&　IS_GZIP){
      const plugin = [];
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
  }
}
```
更多详细配置信息说明，[点这里](https://github.com/webpack-contrib/compression-webpack-plugin)。