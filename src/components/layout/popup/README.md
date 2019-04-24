## Popup 弹出层
### 使用指南
``` javascript
import MPopup from "components/layout/popup";

Vue.component(MPopup);
```
### 代码演示
#### 基础用法
```html
 <m-popup v-model="popshow">popup-fade-center</m-popup>
```
```javascript
export default {
  data() {
    return {
      popshow: false
    }
  }
};
```
#### 弹出位置
通过 `position` 属性设置 Popup 弹出位置
```html
 <m-popup v-model="popshow" position="left">popup-left</m-popup>
```
#### 是否有遮罩层、点击蒙层可关闭
通过 `hasMask` 属性设置 Popup 是否有遮罩层，默认显示；<br>
通过 `maskClosable` 属性设置 Popup 点击蒙层是否可关闭，默认点击可关闭。
```html
 <m-popup v-model="popshow" :hasMask="false" :maskClosable="false">popup-left</m-popup>
```

### Props
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| v-model | 弹出层是否显示 | `Boolean` | `false` | - |
| position | 弹出层位置 | `String` | `center` | 可选值有：`top`、`right`、`bottom`、`left`|
| hasMask | 弹出层是否含蒙层 | `Boolean` | `true` | - |
| maskClosable | 点击蒙层是否可关闭弹出层 | `Boolean` | `true` | - |

### Event
| 事件调用 | 说明 | 参数 | 备注 |
|------|------|------|------|
| @open | 打开弹出层时触发 | - | - |
| @opened | 打开弹出层时触发并且动画执行完成后触发 | - | - |
| @close | 关闭弹出层时触发 | - | - |
| @closed | 关闭弹出层时触发并且动画执行完成后触发 | - | - |
| @clickMask | 点击蒙层时触发 | - | - |