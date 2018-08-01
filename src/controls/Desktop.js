import Control from './Control'
import Taskbar from './Taskbar'

export default class Desktop extends Control {
    constructor(parent) {
        super(parent)
        this.backgroundColor = this.theme.desktop
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
        this.taskbar.height = 28
    
    }
    addWindow(window) {
        this.controls[window.id] = window
    }
}