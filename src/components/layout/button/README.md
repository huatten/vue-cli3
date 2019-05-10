## Button 按钮
### 使用指南
``` javascript
import MButton from "components/layout/button";

Vue.component(MButton);
```
### 代码演示
#### 基础用法
```html
 <m-button>按钮</m-button>
```
#### 按钮类型
通过 `type` 属性设置 Button 类型，一共有 `defalut` 、`primary` 、`info` 、`danger` 、`warning`  五种类型 、默认为 `defalut`。
```html
 <m-button>默认按钮</m-button>
 <m-button type="primary">主要按钮</m-button>
 <m-button type="info">信息按钮</m-button>
 <m-button type="danger">危险按钮</m-button>
 <m-button type="warning">警告按钮</m-button>
```
#### 朴素按钮
通过 `plain` 属性设置 Button 是否是朴素按钮，朴素按钮表现为文字颜色是按钮颜色，背景色为白色。
```html
 <m-button type="primary" plain>朴素&&主要按钮</m-button>
 <m-button type="info" plain>朴素&&信息按钮</m-button>
```
#### 圆角按钮
通过 `round` 属性设置 Button 是否是圆角按钮。
```html
 <m-button type="primary" round>圆角&&主要按钮</m-button>
```
#### 块级按钮
通过 `inline` 属性设置 Button 是否是块级按钮，默认为行内按钮。
```html
 <m-button type="primary" :inline="false">块级&&主要按钮</m-button>
```
#### 禁用状态
通过 `disabled` 属性设置 Button 是否是可点击。
```html
 <m-button type="primary" disabled>禁用&&主要按钮</m-button>
```
#### 添加图标
#### 加载状态
#### 按钮尺寸
#### 按钮点击动效

待补充
