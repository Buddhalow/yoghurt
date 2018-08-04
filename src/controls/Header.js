import Control from '.'
import Button from './Button';
import Font from '../graphics/font';


export default class Header extends Control {
    constructor(parent) {
        super(parent)
        this.rightButtons = []
        this.backgroundColor = this.theme.highlight
        this.font = new Font('Tahoma', 11)
    }
    mouseDownAction(x, y, button='left') {
        if (super.mouseDownAction(x, y, button)) return true
        this.parent.isMoving = true
    }
    mouseUp(x, y, button='left') {
        super.mouseUp(x, y, button)
        this.parent.stopMoving()
    }
    addRightButton(text, id, pos) {
        let button = new Button(this)
        button.width = 13
        button.height = 13
        button.text = text
        button.x = this.width - 16 - pos * 16
  
        button.y = 3
        this.controls[id] = button
        this.rightButtons.push(button)
    }
    load() {
        super.load()
        this.closeButton = this.addRightButton('x', 'closeButton', 0)
        this.maximizeButton = this.addRightButton('o', 'maximizeButton', 1)
        this.minimizeButton = this.addRightButton('_', 'minimizeButton', 2)
    }
    render(gc) {
        this.style.renderHeader(gc, this, false)
        super.render(gc, false)
    }
} 