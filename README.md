# sketch-color-picker

## 纯JavaScript实现的颜色选择器

### 特点
* 简单易用，美观大方
* 色彩工具使用 [TinyColor](https://www.npmjs.com/package/tinycolor2)

### 获取
你可以直接下载 dist 目录里的js文件, 也可以 fork 源码自定义构建

``` bash
npm install
npm build
```

## 用法
### [示例](/example/index.html)

### UMD
```html
<script type="text/javascript" src="dist/sketch-color-picker.min.js"></script>
<script type="text/javascript">
    var Picker = new SketchColorPicker(element, options);
</script>
```