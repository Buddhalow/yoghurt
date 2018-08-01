import Control from './Control'
import Button from './Button';


export class Header extends Control {
    constructor(parent) {
        super(parent)
        this.rightButtons = []
        this.backgroundColor = this.theme.highlight
    }
    mouseDown(x, y, button='left') {
        this.parent.isMoving = true
    }
    mouseUp(x, y, button='left') {
        this.parent.stopMoving()
    }
    addRightButton(text, id) {
        let button = new Button(this)
        button.width = 20
        button.height = 20
        button.text = text
        
        button.x = this.width - 2 - this.rightButtons.length * 22
        button.y = 2
        this.controls[id] = button
        this.rightButtons.push(button)
    }
    load() {
        this.closeButton = this.addRightButton('x', 'closeButton')
    }
    render(gc) {
        super.render(gc)
        gc.setFillStyle(this.theme.highlightText)
        gc.fillText(this.label, 12, 12)
    }
}