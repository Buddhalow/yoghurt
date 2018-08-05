import Control from '.'
import Header from './Header';
import MenuBar from './MenuBar'

/**
 * A window defines a window
 */
export default class Window extends Control {
    constructor(parent, id, width=640, height=480, menus=null, toolbars=null) {
        super(parent, id, width, height)
        this.menus = menus
        this.top = 28
        
        this.borderStyle = 'bevel'
        this.closeOnInactivate = false
        this.showInTaskBar = true
        
        this.width = width
        this.height = height
        this.toolbars = toolbars
        
        this.canBeResized = true
        this.klass = 'window'
    }
    get menus() {
        return this._menus
    }
    set menus(value) {
        this._menus = value
        if (!this.menubar) return
        this.menubar.menus = value
        this.yoghurt.render()
    }
    close() {
        delete this.parent.controls[this.id]
        console.log('Closing ' + this.id)
        this.unrender()
        this.yoghurt.render()
    }


    show() {
        super.show()
    }

    activate() {
        this.zIndex = 0
    }
    pack() {
        super.pack()
        if (!this.header) {
            this.header = new Header(this)
            this.controls['header'] = this.header
        }
        if (!this.content) {
        this.content = new Control(this, 'content')
        this.controls['content'] = this.content
        }
        if (!this.menubar) {
            this.menubar = new MenuBar(this, 'menubar', this.menus)
            this.controls['menubar'] = this.menubar
        }
        let y = 0
        this.header.x = 4
        this.header.y = 4
        y += 4
        
        this.header.height = 19
        this.header.width = this.width - 8
        this.header.pack()
        y += this.header.height
        this.menubar.width = this.width - 8
        this.menubar.height = 20
        this.menubar.x = 4
        this.menubar.y = y
        y += this.menubar.height
        if (this.toolbars != null) {
            if(!this.toolbarPanel) {
                this.toolbarPanel = new ToolBarPanel(this, 'toolbarpanel')
                this.controls['toolbarpanel'] = this.toolbarPanel
            }
            this.toolbarPanel.y = y
            this.toolbarPanel.height = 18
            this.toolbarPanel.width = this.width - 4
            y += this.toolbarPanel.height
        } 
        this.content.left = 2
        this.content.top = y
        this.content.width = this.width - 4
        this.content.height = this.height - y
        super.pack()
    }

    load() {
        if (this.isLoaded) return
        this.header.load()
        this.yoghurt.desktop.emit('windowadded', this)
        this.focus()
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