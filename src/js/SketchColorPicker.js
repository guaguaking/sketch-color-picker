import UI from '@/js/Ui';
import tinyColor from "tinycolor2";
const PRESET_COLORS = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000000',
  '#4a4a4a',
  '#9b9b9b',
  '#ffffff'
]


class SketchColorPicker {
  constructor(wrapper, option={
    color: 'rgb(0,0,255)'
  }){
    this._option = option;
    this._initColor(option.color);
    this.ui = new UI(wrapper, {
      presetColors: PRESET_COLORS.filter(c=>tinyColor(c).isValid()),
      hsv: this.hsv,
      onChange: this.handleHsvChange
    })
    
  }

  _initColor(originalColor) {
    const color = tinyColor(originalColor);
    if(!color.isValid()) {
      throw Error('color 不是一个有效的颜色值')
    }
    this.hsv = color.toHsv();
  }

  handleHsvChange = (color)=> {
    this.color = tinyColor(color);
    if(this._option?.onChange) {
      this._option.onChange(color)
    }
  }

  _isVisible = false

  get visible(){
    return this._isVisible;
  }

  set visible(val){
    this._isVisible = val;
    if(val) {
      this.ui.show();
    } else {
      this.ui.hide();
    }
  }
}

export default SketchColorPicker;