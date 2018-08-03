import Control from './Control'
import Header from './Header';
import MenuBar from './MenuBar'

export default class Window extends Control {
    constructor(parent, id, width=640, height=480, menus={}) {
        super(parent, id)
        this.menus = menus
        this.top = 28
        this.header = new Header(this)
        this.controls['header'] = this.header
        this.borderStyle = 'bevel'
        this.closeOnInactivate = false
        this.showInTaskbar = false
        this.content = new Control(this, 'content')
        this.controls['content'] = this.content
        this.width = width
        this.height = height
        this.controls['menubar'] = this.menubar
    }
    close() {
        delete this.parent.controls[this.id]
        this.yoghurt.render()
    }


    activate() {
        this.zIndex = 0
    }
    pack() {
        super.pack()
        this.header.x = 4
        this.header.y = 4
        this.header.height = 28
        this.header.width = this.width - 8
        this.header.pack()
        this.menubar = new MenuBar(this, 'menubar', this.menus)
        this.menubar.top = this.header.height
        this.content.left = 2
        this.content.top = 52
        this.content.width = this.width - 4
        this.content.height = this.height - 4
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