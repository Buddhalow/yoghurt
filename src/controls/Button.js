import Control from './Control'
import Font from '../graphics/font'

export default class Button extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.buttonState = 'normal'
        this.buttonStyle = 'normal'
        this.enabled = true
        this.focused = false 
        
        
    }
    clickAction(x, y, button='left') {
        this.emit('click', x, y, button)
    }

    render(gc) {
        super.render(gc)
        this.style.renderButton(gc, this)
        
    }
    mouseDown(x, y, button) {
        super.mouseDown(x, y, button)
        this.buttonState = 'pressed'
        this.focus()
        this.yoghurt.render()
    }
    mouseUp(x, y, button) {
        super.mouseUp(x, y, button)
        this.buttonState = 'normal'
        this.yoghurt.render()
    } 
}