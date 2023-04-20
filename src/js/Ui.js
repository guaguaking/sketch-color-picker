import tinyColor from "tinycolor2";
import generateTemplate from '@/js/ui/template'

import Sketchpad from './ui/Sketchpad'
import PresetColorButtons from './ui/PresetColorButtons'
import HueSlider from './ui/HueSlider'
import AlphaSlider from './ui/AlphaSlider'
import Preview from './ui/Preview'
import EditableInput from './ui/EditableInput'



const PREFIX = 'sketch-color-picker'


class UI {
  constructor(element, option){
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element.nodeType !== 1) {
      throw Error('必须传入一个 HTMLElement 或者一个有效的 selectors')
    }
    this._mountElement = document.body;
    this._parentElement = element;
    this._option = option;
    this.hsv = option.hsv;
    this._makeUiElement();
    this._registerUI()
  }

  // register ui
  _registerUI(){
    this.widgets = [
      new Sketchpad(this),
      new PresetColorButtons(this),
      new HueSlider(this),
      new AlphaSlider(this),
      new Preview(this),
      new EditableInput(this)
    ]
  }

  // generate template
  _makeUiElement() {
    const element = document.createElement('div');
    element.classList.add(PREFIX + '__wrapper')
    element.style = 'display: none;'
    element.innerHTML = generateTemplate({
      prefix: PREFIX
    });
    this._mountElement.appendChild(element)
    this._element = element;
  }

  // HsvChange
  _handleHsvChange(colorInput){
    let color;
    switch (colorInput.source) {
      case 'hsv':
        this.hsv = colorInput;
        color = tinyColor(colorInput);
        break;
      case 'hex':
        color = tinyColor(colorInput.hex);
        this.hsv = color.toHsv();
        break;
      case 'rgb':
        color = tinyColor(colorInput);
        this.hsv = color.toHsv();
        break;
    }
    // const color = tinyColor(colorInput)
    // this.hsv = color.toHsv();
    this._option.onChange(color)
    this.widgets.forEach(widget=>widget.render())
  }

  // selector
  _selector(selector){
    return this._element.querySelector(selector)
  }

  show(){
    this._element.style = 'display: block;'
    const offset = 10;
    const maxHeight = document.documentElement.clientHeight
    const scrollTop =document.documentElement.scrollTop
    const height = this._element.clientHeight;
    const rect = this._parentElement.getBoundingClientRect()
    if(rect.bottom + height + 2*offset > maxHeight) {
      this._element.style = `display: block;left:${rect.left}px;top:${rect.top+scrollTop-height-offset}px;`
    } else {
      this._element.style = `display: block;left:${rect.left}px;top:${rect.top+rect.height+scrollTop+offset}px;`
    }
  }

  hide(){
    this._element.style = 'display: none;'
  }

  destroy() {
    this.widgets.forEach(widget=>widget.destroy())
    this._mountElement.removeChild(this._element)
    this._parentElement = null
    this._option = null
    this._element = null
  }
}

export default UI