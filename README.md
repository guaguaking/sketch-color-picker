# sketch-color-picker

* 仿制Sketch的颜色选择器

## 用法
```html
<script src="../lib/sketch-color-picker.min.js"></script>

<script>
    var initColor = 'rgba(255,0,255,0.5)' // #7ed321
    var btn = document.querySelector('.btn');
    var sketchBox = document.querySelector('.sketch-color-box');
    var Picker = new SketchColorPicker(sketchBox, {
      color: initColor,
      onChange: function(color){
        sketchBox.style.background = color.toRgbString()
      }
    })

    sketchBox.style.background = initColor;
    sketchBox.addEventListener('click', function(){
      // 通过visible 控制可见
      Picker.visible = !Picker.visible
    })

    // destroy Picker.destroy();

</script>
```


[license-image]: http://img.shields.io/npm/l/react-color.svg
[license-url]: LICENSE
