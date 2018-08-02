import Control from './Control'

export default class Tray extends Control {
    constructor(parent, id) {
        super(parent, id)
    }
    render(gc) {
        this.style.renderTray(gc, this)
    }
}