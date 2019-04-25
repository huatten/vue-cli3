# vue-cli3 移动端从0到1搭建配置(持续完善)
<span id="top">目录</span>

- [√ 安装 @vue/cli并初始化](#install)
- [√ 配置多环境变量](#env)
- [√ 添加别名 alias](#alias)
- [√ 配置 externals和cdn开关](#externals)
- [√ 去除生产环境的 console.log](#console)
- [√ 去除无效冗余的css](#css)
- [√ 图片压缩](#tiny)
- [√ 开启Gzip压缩](#gzip)
- [√ 添加打包分析](#analyz)
- [√ 为 sass 配置全局变量](#sass)
- [√ 布局方案以及px自动转换rem](#px2rem)
- [√ 全局组件自动注册](#component)
- [√ 路由拆分模块、懒加载以及自动引入](#router)

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

[▲ 返回目录](#top)
### <span id="env">☞ 配置多环境变量</span>

不得不说不认真仔细看文档的话，这个是个坑... [
查看文档](https://cli.vuejs.org/zh/guide/mode-and-env.html) <br/>

在 vue-cli3 项目中，删除了以往存放环境变量的 config目录，改为：
```
.env                        #在所有的环境中被载入
.env.local                  #在所有的环境中被载入，但会被git忽略
.env.[mode]                 #只在指定的模式中被载入
.env.[mode].local           #只在指定的模式中被载入，但会被git忽略
```
依次建立 `.env.dev`、`.env.prod`、 `.env.analyz` 文件，key=value 形式写入环境变量。

##### .env.dev serve 默认的环境变量
```
NODE_ENV = 'development'
VUE_APP_ENV = dev
VUE_APP_BASE_API = 'https://jelly.dev.sina.com.cn'
```
##### .env.production build 默认的环境变量
```
NODE_ENV = 'production'
VUE_APP_ENV = pro
VUE_APP_BASE_API = 'https://jelly.sina.com.cn'
```
##### .env.analyz 用于 webpack-bundle-analyzer 打包分析
```
NODE_ENV = 'production'
VUE_APP_ENV = analyz
VUE_APP_BASE_API = 'https://jelly.sina.com.cn'
```
注意：**一定记得要以 `VUE_APP_ ` 开头命名变量，不然不会写入到 `process.env`**，以 *`VUE_APP_`* 开头命名的变量 *`VUE_APP_*`* 就可以在项目中愉快的使用 *`process.env.VUE_APP_*`* 访问了。<br/>
如下面所提到的打包分析：
```javascript
module.export = {
  chainWebpack: config => {
    process.env.VUE_APP_ENV === "analyz" &&
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  }
}
```
在package.json的scripts中添加配置命令
```
 "scripts": {
    "analyz": "vue-cli-service build --mode analyz"
  }
```
这样就可以直接运行 `npm run analyz` 来进行打包分析了。

[▲ 返回目录](#top)

### <span id="alias">☞ 添加别名 alias</span>
创建 import 或 require 的别名，来确保模块引入变得更简单,[resolve.alias 文档地址](https://doc.webpack-china.org/configuration/resolve/#resolve-alias)。
``` javascript
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
[▲ 返回目录](#top)

### <span id="externals">☞ 配置 externals和cdn开关</span>
正常情况下，项目中的依赖包，如 vue, vue-router, axios, lodash, echarts等这样的包，都是直接从node_modules目录中打包进项目中，无形中增加了打包后的文件体积。<br/>
我们可以利用webpack提供的externals节点，将上述包配置成外联的形式，防止将某些 import 的包打包到bundle中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
```javascript
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
```
```html
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
[▲ 返回目录](#top)
### <span id="console">☞ 去除生产环境的console.log</span>
console.log用于向开发控制台打印一条消息，常用来在开发时候调试分析，有时候在开发的时候可能需要打印一些对象信息，但是在发布的时候忘记去掉console语句，这可能会造成一定的内存泄漏，在传递给console.log的对象是不能被垃圾回收的，因为在代码运行之后需要在开发工具能查看对象信息，所以最好不要在生产环境中console.log任何对象。<br/>

这里可以借助与webpack的 `UglifyJsPlugin` 插件来去除console.log，插件的更多配置[点这里](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)

```javascript
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
[▲ 返回目录](#top)

### <span id="console">☞ 去除无效冗余的css</span>
当你正在建立一个网站，很可能你正在使用像Bootstrap，Materializecss，Foundation等css框架……但是你只会使用一小组框架，并且会包含大量未使用的CSS样式,Purgecss分析你的内容和你的css文件。然后它将文件中使用的选择器与内容文件中的选择器相匹配。它从你的CSS中删除未使用的选择器，导出更小的CSS文件。更多具体案例请移步[这里](https://github.com/FullHuman/purgecss)clone运行案例。<br/>
purgecss-webpack-plugin更多详细用法和配置移步这里 [查看文档](https://cnpmjs.org/package/purgecss-webpack-plugin) <br/>

安装插件 purgecss-webpack-plugin
```
npm i --save-dev glob-all purgecss-webpack-plugin
```

```javascript
const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all"); //If you need multiple paths use the npm package glob-all instead of glob
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //是否生产环境
const resolve = dir => path.join(__dirname, dir);

module.export = {
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve("./**/*.vue")]),
          extractors: [
            {
              extractor: class Extractor {
                static extract(content) {
                  const validSection = content.replace(
                    /<style([\s\S]*?)<\/style>+/gim,
                    ""
                  );
                  return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
              },
              extensions: ["html", "vue"]
            }
          ],
          whitelist: ["html", "body"],
          whitelistPatterns: [/el-.*/],
          whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  }
}
```
[▲ 返回目录](#top)

### <span id="tiny">☞ 图片压缩</span>
1.安装 `image-webpack-loader`
```
npm install image-webpack-loader --save-dev
```
2.下面的配置代码做了两件事：一是压缩，二是转Base64
```javascript
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
[▲ 返回目录](#top)

### <span id="gzip">☞ 开启Gzip压缩</span>
gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度。html、js、css文件甚至json数据都可以用它压缩，可以减小60%以上的体积，具体可以自行去搜索或者[点这里](https://segmentfault.com/a/1190000012571492)。<br/>
webpack在打包时可以借助  `compression-webpack-plugin` 实现gzip压缩。<br/>

1.安装 `compression-webpack-plugin` 插件
```
npm install compression-webpack-plugin --save-dev
```
2.Vue.config.js配置
```javascript
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
更多详细配置信息说明，[点这里](https://github.com/webpack-contrib/compression-webpack-plugin)。<br/>

[▲ 返回目录](#top)

### <span id="analyz">☞ 添加打包分析</span>
1.安装webpack-bundle-analyzer插件
```
npm intall webpack-bundle-analyzer –save-dev
```
2.在chainWebpack中配置plugin
```javascript
module.export = {
  chainWebpack: config => {
    process.env.VUE_APP_ENV === "analyz" &&
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  }
}
```
3.在package.json的scripts中添加配置命令
```
 "scripts": {
    "analyz": "vue-cli-service build --mode analyz"
  }
```
4.运行命令
```
npm run analyz
```
[▲ 返回目录](#top)

### <span id="sass">☞ 为 sass 配置全局变量</span>
我的sass目录
 ```
 |-- assets
    |-- icons
    |-- js
    |-- scss
        |-- index.js
        |-- reset.scss          //清除浏览器默认样式
        |-- variable.scss       //根据设计规范提取颜色、字体等sass变量
        |-- mixin.scss          //mixin类
        |-- public.scss         //公共样式表
        |-- transition.scss     //动画以及过渡效果
 ```
 1.准备存放全局样式变量的sass文件variable.scss
 ```scss
 /*颜色定义规范*/
  $color_background:#fafafa;   //页面背景色
  $color_orange: #ff8200 ;     //页面主题色
  $color_text: #333;  //页面通用字体色
  $color_link:#5983b2;  //链接文字颜色
  $color_border: #e2e4ea;  //边框颜色
  $color_333: #333;
  $color_666: #666;
 ```
 2.配置loader
 ```javascript
module.export = {
  css: {
    // 是否使用css分离插件
    extract: true,
    loaderOptions: {
      // 配置scss全局变量
      sass: {
        data: `@import "@/assets/scss/mixin.scss";
               @import "@/assets/scss/variable.scss";` //!!!切记;不能丢
      }
    }
  }
}
 ```
[▲ 返回目录](#top)

### <span id="px2rem">☞ 布局方案以及px自动转换rem</span>
移动端布局开发解决方案选择--hotcss，让移动端布局开发更加容易 [传送门](https://www.npmjs.com/package/hotcss)。

1.在public/index.html中引入hotcss.js库，最好在head标签里面引入。<br/>

2.如何实现px转换rem？<br/>
&emsp;&emsp;方案一:定义sass函数方法<br>
&emsp;&emsp;在scss文件的头部使用import将px2rem导入
```scss
@import 'scss/px2rem.scss';
```
&emsp;&emsp;若你的项目是单一尺寸设计图，那么你需要去px2rem.scss中定义全局的designWidth。
```scss
@function px2rem($px){
  @return $px * 320 / $designWidth / 20 + rem;
}
$designWidth : 750; //如设计图是750 
```
&emsp;&emsp;方案二: 利用webpack插件postcss-plugin-px2rem和postcss-flexible实现自动转换<br>

&emsp;&emsp;修改我们的 `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["> 0.01%", "Android >= 4.0", "Firefox ESR", "Ios >= 8.0"]
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
```
[▲ 返回目录](#top)

### <span id="component">☞ 全局组件自动注册</span>
在components目录下存放我们的公共视图组件(部分)和插件
```
 |-- components
    |-- layout                  //视图组件
        |-- header              //公共头部组件
            |-- index.vue
            |-- README.md
        |-- footer              //公共底部导航组件
            |-- index.vue
            |-- README.md
        |-- content             //内容滚动组件
            |-- index.vue
            |-- README.md
        |-- marquee             //消息滚动组件
            |-- index.vue
            |-- README.md
        |-- confirm             //confirm弹窗组件
            |-- index.vue
            |-- README.md
        |-- tabbar              //可滑动导航菜单组件
            |-- index.vue
            |-- README.md
        |-- index.js            //用来扫描全局对象并自动注册
    |-- plugin                  //公共插件
        |-- loading             //加载提示插件
            |-- index.vue
            |-- index.js
            |-- README.md
        |-- toast              //轻提示插件
            |-- index.vue
            |-- index.js
            |-- README.md
        |-- notify             //消息通知组件
            |-- index.vue
            |-- index.js
            |-- README.md
        |-- index.js            //用来扫描全局对象并自动注册
 ```

 在components/layout中创建一个index.js入口文件，用来扫描全局对象并自动注册全局视图组件。

 ```javascript
import Vue from "vue";
// Register global components
const requireComponent = require.context("./", true, /\w+\.(vue)$/);
requireComponent.keys().forEach(component => {
  const componentConfig = requireComponent(component);
  const ctrl = componentConfig.default || componentConfig;
  ctrl && Vue.component(ctrl.name, ctrl);
});
 ```
 在components/plugin中创建一个index.js入口文件，用来扫描全局对象并自动注册全局功能插件。
```javascript
// Register global plugin
import Vue from "vue";
const requirePlugin = require.context("./", true, /\w+\.(js)$/); //require.context(directory, useSubdirectories = false, regExp = /^\.\//);
requirePlugin.keys().forEach(plugin => {
  const pluginConfig = requirePlugin(plugin);
  const ctrl = pluginConfig.default;
  ctrl && Vue.use(ctrl);
});
 ```
最后，在main.js 中引入import即可；
```javascript
  //main.js
  import "components/layout";
  import "components/plugin";
```
[▲ 返回目录](#top)

 ### <span id="router">☞ 路由拆分模块、懒加载以及自动引入</span>

 在此前的项目中，路由文件都是写在一个router.js中，这样做到后期路由有三四十个，很不利于维护，因此在项目开始前，我们就要考虑好路由的拆分，我的拆分原则是根据页面和业务功能模块拆分。
 ```
 |-- router
    |-- error              //404、500等错误提示页面路由
        |-- index.js
    |-- home               //首页相关页面路由
        |-- index.js
    |-- list               //产品相关页面路由
        |-- index.vue
    |-- mine               //个人中心相关页面路由
        |-- index.js
    |-- index.js           //用来导入所有的路由子模块
 ```
 例如：404、500等相关页面路由
 ```javascript
 /**
 * @file 404、500等相关路由
 */
export default [
  {
    path: "/500",
    name: "500",
    component: resolve => {
      require.ensure(
        ["@/views/error/500.vue"],
        () => {
          resolve(require("@/views/error/500.vue"));
        },
        "500"
      );
    },
    meta: {
      docTitle: "500",
      keepAlive: false
    }
  },
  {
    path: "*",
    name: "404",
    component: resolve => {
      require.ensure(
        ["@/views/error/404.vue"],
        () => {
          resolve(require("@/views/error/404.vue"));
        },
        "404"
      );
    },
    meta: {
      docTitle: "页面未找到"
    }
  }
];
 ```

在根 index.js中自动导入所有子模块

```javascript
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let routes = [];
const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach(route => {
  if (route.startsWith("./index")) return;  //根目录的 index.js 不处理
  const routerModule = routerContext(route);
  routes = [...routes, ...(routerModule.default || routerModule)];
});

export default new Router({
  //mode: "history",
  linkActiveClass: "active",
  routes: routes
});

```
[▲ 返回目录](#top)
