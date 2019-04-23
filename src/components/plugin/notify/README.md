## Notify 消息提示
### 使用指南
``` javascript
import Notify from "components/plugin/notify";

Vue.use(Notify);
```
### 代码演示
#### 组件内基础调用
```javascript
this.$notify('提示文案');
```
### Options
| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| text | 展示文案 | `String` | - | -|
| time | 展示时长(ms)| `Number` | `3000` | 值为 0 时，notify 不会消失 |
| type | 主题样式 | `String` | `default` | `success` 、 `failed`、 `warning`|
| callback | 回调函数 | `Function` | - | notify消失之后执行回调 |