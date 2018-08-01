import Control from './Control'
import { Header } from './Header';

export default class Window extends Control {
    constructor(parent) {
        super(parent)
        this.menus = {}
        this.top = 28
        this.header = new Header(this)
        this.move = null
        this.controls['header'] = this.header
        
    }

    startMove(pos) {
       this.move = pos
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

    /**
     * Render the control
     * @param {GraphicsContext} gc The Graphics Context
     */
    render(gc) {
        super.render(gc)
        gc.setStrokeStyle('#fff')
        gc.drawLine(2, 2, this.width, 2)
        gc.drawLine(2, 2, 2, this.heght)

    }
}