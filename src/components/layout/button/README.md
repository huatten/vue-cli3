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

### Props 
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| type | 样式类型 | `String` | `default` | 可选值：`primary` 、`info` 、`danger` 、`warning` |
| plain | 是否为朴素按钮 | `Boolean` | `false` | 朴素按钮表现为文字颜色是按钮颜色，背景色为白色 |
| inline | 是否为行内按钮 | `Boolean` | `true` | - |
| size | 尺寸 | `String` | `normal` | 可选值为 `large`、 `small` |
| round | 是否为圆角按钮 | `Boolean` | `false` | - |
| invalid | 未激活按钮 | `Boolean` | `false` | 适用场景为：表单校验无效，按钮无法点击 |
| disabled | 是否禁用按钮 | `Boolean` | `false` | 适用场景为：无权限或不存在等，按钮无法点击 |
| native-type | 原生type属性 | `String` | `button` | 可选值：`submit` 、`button` 、`reset` [参照w3c说明](http://www.w3school.com.cn/tags/att_button_type.asp) |
| icon-name | 按钮icon名称 | `String` | - | 不传值则icon不显示，可选值请参考组件 `MIcon` 组件 |
| icon-type | 按钮icon类型 | `String` | `font` | 默认类型值为 `font`(字体图标），`svg`为 svg图标 |
| loading | 是否显示加载状态 | `Boolean` | `false` | - |
| loading-type | 加载图标类型 | `String` | `roller` | 可选值请参考组件 `MIndicator` 组件，可选 `carousel`、`spinner` |
| loading-size | 加载图标大小 | `Number` | `70` | 可选值请参考组件 `MIndicator` 组件 |
| ripple | 是否开启波纹点击效果 | `Boolean` | `false` | - |
| speed | 波纹展开速度 | `Number` | `11` | - |
| opacity | 波纹透明度 | `Boolean` | `0.3` | - |
