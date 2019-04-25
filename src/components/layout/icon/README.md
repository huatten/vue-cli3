## Icon 图标
### 使用指南
``` javascript
import MIcon from "components/layout/icon";

Vue.component(MIcon);
```
### 代码演示
#### svg 图标
可通过传入 `type`来控制通知栏图标的类型，有 `svg` 和 `iconFont` 两种，默认展示 `svg` 类型。
```html
 <m-icon name="notice"></m-icon>
```
#### iconFont 图标
可通过传入 `type`来控制通知栏图标的类型，有 `svg` 和 `iconFont` 两种。
```html
 <m-icon name="notice" type="font"></m-icon>
```

### Props
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| name | 图标名称 | `String` | - | iconfont字体图标可参考[Iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)；svg文件放置目录为 `assets/icon/svg` 具体说明看附录说明 |
| type | 图标类型 | `String` | `svg` | 有svg类型 `svg` 和iconfont类型 `font` |
| fill | 图标颜色 | `String` | `currentColor` | - |

### Event
| 事件调用 | 说明 | 参数 | 备注 |
|------|------|------|------|
| @click | 点击图标时触发 | - | - |

### 附录说明
自定义svg图标需使用 `svg-sprite-loader` 插件，svg文件名即图标名称。如果不知道 `svg-sprite` 是什么，可以参考张鑫旭大神的文章 [《未来必热：SVG Sprite技术介绍》](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)<br>
使用 svg-sprite 的好处 <br>
* 页面代码清爽
* 可使用 ID 随处重复调用
* 每个 SVG 图标都可以更改大小颜色

1.首先在 `/src/components` 创建 `icon/index.vue`：<br>

```html
 <!--只看svgicon-->
 <template>
   <svg
    v-if="type === 'svg'"
    aria-hidden="true"
    class="m-icon m-svg-icon"
    :class="[`m-icon-${name}`]"
    :style="`fill:${fill}`"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`"></use>
  </svg>
 </template>
 ```
```javascript
export default {
  name: "MIcon",
  props: {
    type: {
      type: String,
      default: "svg" //svg font
    },
    name: {
      type: String,
      required: true,
      default: ""
    },
    fill: {
      type: String,
      default: "currentColor"
    }
  }
};
```
2.在src/下创建 `icons` 文件夹，以及在其下创建 `svg` 文件夹用于存放svg文件，创建 `index.js` 作为入口文件：

```javascript
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);
```
3.使用 `svg-sprite-loader` 对项目中使用的svg进行处理，安装 `svg-sprite-loader` 插件
```
npm install svg-sprite-loader --save-dev
```
4.修改默认的webpack配置：
```javascript
const path = require("path");
const glob = require("glob-all"); //If you need multiple paths use the npm package glob-all instead of glob
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
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
      imagesRule.exclude.add(resolve("src/assets/icons"));
      config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  }
}
```
5.最后，在main.js 中引入import `assets/icons` 即可；
```javascript
  //main.js
  import "assets/icons";
```
使用示例：
```html
  <m-icon name="user"></m-icon>
```
至于svg，参考 [阿里妈妈开源图标库](https://www.iconfont.cn/collections)
