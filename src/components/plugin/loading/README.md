## Loading 加载提示组件
### 使用指南
``` javascript
import Loading from "components/plugin/loading";

Vue.use(Loading);
```
### 代码演示
#### 显示加载
```javascript
this.$loading("加载提示文案");
```
#### 隐藏加载
```javascript
this.$clearLoading();
```