import Control from './Control'
import Taskbar from './Taskbar'

export default class Desktop extends Control {
    constructor(parent) {
        super(parent)
        this.backgroundColor = this.theme.desktop
        this.desktop = this
        this.yoghurt = this.parent
        this.windows = {}
        this.activeWindow = null
    }

    addWindow(id) {
        let window = new Window(this)
        this.windows[id] = window
        this.controls[id] = window
        this.emit('windowadded')
        return window
    }

    load() {
        this.emit('load')
        this.taskbar = new Taskbar(this)
        this.controls['taskbar'] = this.taskbar
        super.load()
    }
    pack() {
        super.pack()
        this.taskbar.x = 0
        this.taskbar.y = this.height - this.taskbar.height
        this.taskbar.width = this.width
        this.taskbar.height = 30
    
    }
    addWindow(window) {
        this.controls[window.id] = window
    }
}