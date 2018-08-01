import Control from './Control'
import Button from './Button'

export default class Taskbar extends Control {
    constructor(parent) {
        super(parent)
    }
    load() {
        super.load()

        this.startButton = new Button()
        this.startButton.left = 2
        this.startButton.top = 2
        this.startButton.width = 33
        this.startButton.height = 18
        this.controls['start'] = this.startButton

    }
    render() {

    }
}