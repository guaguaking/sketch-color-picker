import Widget from './Widget';
import * as helpers from '../helpers/saturation'
import * as utils from '../helpers/utils'

class Sketchpad extends Widget {
  constructor(ui){
    super(ui, '[widget="sketchpad"]');
    this._handler = this._selector('[handler]');
    this._addEvent()
    this.render()
  }

  render() {
    const {h, s, v} = this._ui.hsv
    this._element.style = `background: hsl(${h}deg, 100%, 50%)`;

    this._handler.style = `
      left: ${s*100}%;
      top: ${(1-v)*100}%;
    `
  }

  // 绑定事件
  _addEvent(){
    this._events = {
      handleMouseDown: (e)=>{
        this._events.handleChange(e);
        document.addEventListener('mousemove', this._events.handleChange)
        document.addEventListener('mouseup', this._events.handleMouseUp)
      },
      handleChange: utils.throttle((e)=> {
        const hsv = helpers.calculateChange(e, this._ui.hsv, this._element)
        this.handleChange(hsv);
      }, 50),
      handleMouseUp: (e)=>{
        document.removeEventListener('mousemove', this._events.handleChange)
        document.removeEventListener('mouseup', this._events.handleMouseUp)
      }
    }
    this._element.addEventListener('mousedown', this._events.handleMouseDown)
  }

  // 移除事件
  _removeEvent(){
    this._element.removeEventListener('mousedown', this._events.handleMouseDown)
  }
}

export default Sketchpad