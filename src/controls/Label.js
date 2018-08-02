import Control from './Control'

export default class Label extends Control {
    constructor(parent, id) {
        super(parent, id)
    }
    render(gc) {
        super.render(gc)
        gc.setFillStyle('black')
        gc.fillText(this.text, 0, 0, this.width, this.height)
    }
}