import Control from '.'
import Button from './Button';

export default class ToolBar extends Control {
    constructor(parent, id, toolbar) {
        super(parent, id)
        this.buttonStyle = this.parent.buttonStyle
        if (toolbar)
        this.setToolbar(toolbar)
        
    }
    setToolbar(toolbar) {
        for (let k of this.controls) {
            delete this.controls[k]
        }
        for (let item of toolbar.items) {
            let button = new Button(this, item.id)
            button = Object.assign(button, item)
            button.buttonStyle = this.buttonStyle
            this.addButton(button)
        }
    }
    addButton(button) {
        let button = new Button(this, button.id)
        this.controls[button.id] = button
        button.on('click', (x, y, button) => {
            if (button.left) {
                this.parent.emit('command', button.id)
            }
        })
        this.pack()
    }

    pack() {
        let i = 0
        let left = 0
        let buttonSize = 18
        for (let buttonId of Object.keys(this.controls)) {
            let button = this.controls[buttonId]
            button.left = left
            button.top = 0
            button.width = this.graphics.measureText(button.text) + 18
            button.height = buttonSize            
            left += button.width
        }
        this.width = left
        this.yoghurt.render()
    }
    render(gc) {
        super.render(gc)
        this.style.renderToolbar(gc, this)
    }

}