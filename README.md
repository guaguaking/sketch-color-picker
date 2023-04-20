# sketch-color-picker

## Usage
```html
<script src="../lib/sketch-color-picker.min.js"></script>

<script>
var Picker = new SketchColorPicker(sketch, {
  color: '#13e46f',
  onChange: function(color){
    document.body.style.backgroundColor = color.toRgbString()
  }
})
</script>
```


