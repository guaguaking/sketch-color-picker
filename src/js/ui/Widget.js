import tinyColor from "tinycolor2";

class Widget {
  constructor(ui, selector) {
    this._ui = ui;
    this._element = ui._selector(selector)
    this._events = {};
    this._makeUiElement()
  }

  handleChange(hsv){
    hsv && this._ui._handleHsvChange(hsv)
  }

  _getTinyColor(color){
    return tinyColor(color)
  }

  _makeUiElement(){
    
  }


  _selector(selector, _element=this._element){
    if(!_element) throw Error('请先声明_element！')
    return _element.querySelector(selector)
  }

  _selectorAll(selector){
    return this._element.querySelectorAll(selector)
  }

  render() {}
}

export default Widget;