## Noticebar 通知栏
### 使用指南
``` javascript
import MNoticebar from "components/layout/noticebar";

Vue.component(MNoticebar);
```
### 代码演示
#### 基础用法
```html
 <m-noticebar>我是默认的通知栏，什么props都不传。</m-noticebar>
```
#### 通知栏（设置左侧icon和右侧icon）
可通过传入 `iconType`来控制通知栏图标的类型，有 `svg` 和 `iconFont` 两种。
```html
 <m-noticebar leftIcon="notice">我左侧图标是svg类型的通知栏，iconType默认不传就是svg类型。</m-noticebar>
```
```html
 <m-noticebar leftIcon="history" iconType="font">我左侧图标是iconFont类型的通知栏，iconType传值font。</m-noticebar>
```

#### 通知栏（设置外观主题样式）
可通过传入 `background` 和 `color`来控制通知栏背景色和文字颜色。
```html
 <m-noticebar background="rgba(89,158,248,.08)" color="#2f86f6">我是换了背景和文字颜色的通知栏</m-noticebar>
```
```html
 <m-noticebar leftIcon="notice" mode="link">我是带有图标的的通知栏，点击我查看详情。</m-noticebar>
```

#### 通知栏（可关闭模式、链接模式）
默认模式 `mode` 为空，支持 `close` 和 `link`。
```html
 <m-noticebar leftIcon="notice" mode="close">我是带有图标的的通知栏，可关闭。</m-noticebar>
```
```html
 <m-noticebar leftIcon="notice" mode="link">我是带有图标的的通知栏，点击我查看详情。</m-noticebar>
```

#### 通知栏（设置时间隐藏）
默认 `time` 为空，可传 `String` 或者 `Number`
```html
 <m-noticebar time="5000">我是通知栏，5s以后自动关闭。</m-noticebar>
```

#### 通知栏（禁用滚动）
文字内容多于一行时，可通过 `scrollable` 参数控制是否开启滚动，默认开始滚动。
```html
<m-noticebar :scrollable="false">我是通知栏，文字太长但是不想滚动了，展示不下多余的隐藏。</m-noticebar>
```

#### 通知栏（文本换行）
禁用滚动时，可以设置 `wrapable` 来开启文本换行
```html
<m-noticebar :scrollable="false" wrapable>我是通知栏，文字太长了，需要开启文本换行展示。</m-noticebar>
```

#### 通知栏（设置滚动速度）
默认 `speed` 为 80px/s，可传 `String` 或者 `Number`
```html
<m-noticebar speed="120">我是通知栏，文字太长了，现在跑得好慢我要加快速度滚动啦。</m-noticebar>
```

#### 通知栏（设置延时滚动）
默认 `delay` 为 1s，可传 `String` 或者 `Number`
```html
<m-noticebar delay="2">我是通知栏，默认我是1s后才开始滚动的，现在</m-noticebar>
```

#### 通知栏（插槽模式）
`left` 左侧插槽，一般用于放置icon图标等;<br>
`right` 右侧插槽，一般用于放置icon图标（link、close）等;<br>
```html
 <m-noticebar>
    <span slot="left"><m-icon name="problem" type="font"></m-icon></span>
    我是使用插槽自定义的带图标的通知栏，多来点文字滚滚
    <span slot="right" class="right-svg"><m-icon name="close" type="svg"></m-icon></span>
</m-noticebar>
```

### Props
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| mode | 右侧提示类型 | `String` | - | `close`、`link` |
| leftIcon | 左侧svg图标 | `String` | `notice` | 可添加svg传name |
| iconType | 图标类型 | `String` | `svg` | 有svg类型 `svg` 和iconfont类型 `font` |
| background | 背景色 | `String` | `#fffbe8` | - |
| color | 文字色 | `String` | `#ff8200` | - |
| circular | 圆角展示 | `String` | `#ff8200` | - |
| time | 显示时长 | `String`、`Number` | `0` | time为0不自动消失 |
| scrollable | 内容超出滚动播放 | `Boolean` | `true` | 优先级低于wrapable |
| speed | 滚动速度 | `String`、`Number` | `80` | px/s |
| delay | 动画延迟时间 (s) |`String`、`Number` | `1` | s |
| wrapable | 开启文本换行，只会在禁用滚动时生效 | `Boolean` | `false` | - |

### Slot
| 插槽名 | 说明 | 备注 |
|------|------|------|
| left | 放置左侧图标 | - |
| right | 放置右侧图标 | - |

### Event
| 事件调用 | 说明 | 参数 | 备注 |
|------|------|------|------|
| @click | 点击时触发 | - | - |
| @close | 关闭时触发 | - | - |