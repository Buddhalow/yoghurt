import Control from './Control'
import Button from './Button'

export default class Taskbar extends Control {
    constructor(parent, id) {
        super(parent, id)
    }

    render(gc) {
        super.render(gc)
        gc.setStrokeStyle(this.theme.btnHighlight)
        gc.drawLine(0, 2, this.width, 1)
    }

    load() {
        super.load()

        this.startButton = new Button(this)
        this.startButton.text = 'Start'
        this.startButton.left = 4
        this.startButton.top = 5
        this.startButton.width = 63
        this.startButton.height = 20
        this.controls['start'] = this.startButton
    }
}