import Control from '.'
import Button from './Button';
import Font from '../graphics/Font';


export default class Header extends Control {
    constructor(parent) {
        super(parent)
        this.rightButtons = []
        this.backgroundColor = this.theme.highlight
        this.font = new Font('Tahoma', 11)
        this.fill = true
        this.klass = 'header'
    }
    mouseDownAction(x, y, button='left') {
        if (super.mouseDownAction(x, y, button)) return true
     
        this.parent.startMove({
            x: x,
            y: y    
        })
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
        button.buttonStyle = 'tool'
        button.isFocusable = false
        button.x = this.width - 16 - pos * 16
        
        button.y = 3
        this.controls[id] = button
        this.rightButtons.push(button)
        return button
    }
    load() {
        super.load()
        this.closeButton = this.addRightButton('x', 'closeButton', 0)
        this.maximizeButton = this.addRightButton('o', 'maximizeButton', 1)
        this.minimizeButton = this.addRightButton('_', 'minimizeButton', 2)
        this.closeButton.on('click', (e) => {
            this.parent.close()
        })
    }
    pack() {
        super.pack()
        for (let i = 0; i < this.rightButtons.length; i++) {
            let button = this.rightButtons[i]
            button.x = this.width - 16 - i * 16

        }
    }
    render(gc) {
        let active = this.desktop.focusedControl  == this.parent 
        this.backgroundColor = (active ? this.theme.highlight : '#888')
  
        super.render(gc, false)
        this.style.renderHeader(gc, this, false)
    }
} 