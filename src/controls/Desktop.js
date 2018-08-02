import Control from './Control'
import Taskbar from './Taskbar'
import Menu from './Menu';

export default class Desktop extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.backgroundColor = this.theme.desktop
        this.graphics = parent.graphics
        this.desktop = this
        this.yoghurt = this.parent
        this.windows = {}
        this.activeWindow = null    
        this.taskbar = new Taskbar(this, 'taskbar')
        this.controls['taskbar'] = this.taskbar
        this.focusedControl = null

    }

    addWindow(id) {
        let window = new Window(this, id)
        this.windows[id] = window
        this.controls[id] = window
        this.emit('windowadded')
        return window
    }

    addMenu(id, items=[]) {
        let menu = new Menu(this, id, items)
        this.controls[id] = menu
        this.emit('windowadded')
        return menu
    }
    inactivateAllWindows() {
        for (let window of Object.values(this.controls)) {
            window.inactivate()
        }
        this.activeWindow = null
    }

    mouseDown(x, y, button='left') {
        if (super.mouseDown(x, y, button)) return true
        this.inactivateAllWindows()        

        this.parent.render()
    }   
    shadowedText(gc, text, x, y) {
        gc.setFillStyle('#000')
        gc.fillText(text, x + 2, y + 2)
        gc.setFillStyle('#fff')
        gc.fillText(text, x, y)

    }
    drawWarning(gc,text) {
        this.shadowedText(gc, text, 22,22)
        this.shadowedText(gc, text, this.width - gc.measureText(text).width - 22,22)
        this.shadowedText(gc, text, 22, this.height -22 - 22)
        this.shadowedText(gc, text, this.width - gc.measureText(text).width - 22, this.height -22 - 22)
    }
    render(gc) {
        super.render(gc)
        this.drawWarning(gc, 'Alpha Version'.toUpperCase())
        this.shadowedText(gc, 'Yoghurt UI Framework. (C) 2018 Alexander Forselius', this.width - 280, this.height - 82)
        this.shadowedText(gc, 'Build 0.2.8. For testing purposes only.', this.width - 205, this.height - 62)
    }


    load() {
        super.load()
        this.emit('load') 
    }
    pack() {
        super.pack()
        this.taskbar.x = 0
        this.taskbar.y = this.height - this.taskbar.height
        this.taskbar.width = this.width
        this.taskbar.height = 30
    
    }
}