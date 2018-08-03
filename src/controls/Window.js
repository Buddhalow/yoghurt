import Control from './Control'
import Header from './Header';

export default class Window extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.menus = {}
        this.top = 28
        this.header = new Header(this)
        this.move = null
        this.controls['header'] = this.header
        this.borderStyle = 'bevel'
        this.closeOnInactivate = false
        this.showInTaskbar = false
        
    }

    close() {
        delete this.parent.controls[this.id]
        this.yoghurt.render()
    }

    startMove(pos) {
       this.move = pos
    }

    activate() {
        this.zIndex = 0
    }
    stopMove() {
        this.move = null
    }
    pack() {
        super.pack()
        this.header.x = 4
        this.header.y = 4
        this.header.height = 28
        this.header.width = this.width - 8
        this.header.pack()
    }

    load() {
        this.header.load()
    }

    mouseDownAction(x, y, button='left') {
        if (super.mouseDownAction(x, y, button)) return true
        this.desktop.activeWindow = this
    }

    /**
     * Render the control
     * @param {GraphicsContext} gc The Graphics Context
     */
    render(gc) {
        super.render(gc)
        this.style.renderWindow(gc, this)
       

    }
}