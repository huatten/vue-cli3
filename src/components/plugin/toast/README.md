## Toast 轻提示
### 使用指南
``` javascript
import Toast from "components/plugin/toast";

Vue.use(Toast);
```
### 代码演示
#### 文字提示
```javascript
this.$toast("文字提示内容");
```
#### 成功/失败/警告提示
```javascript
this.$toast({
  text: "成功文字",
  iconClass: "success"
});
```
### Options
| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| text | 展示文案 | `String` | - | -|
| time | 展示时长(ms)| `Number` | `2500` | - |
| position | 展示位置| `String` | `middle` | `top`、`bottom`|
| iconClass | 带icon提示类型 | `String` | - | `success` 、 `failed`、 `warning`|
| callback | 回调函数 | `Function` | - | toast消失之后执行回调 |