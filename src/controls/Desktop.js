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
        this.controls['menu'] = new Menu(this, 'menu', [
            {
                label: 'test'
            },
            {
                label: 'test 2'
            }
        ])
        this.controls['menu'].x = 112
        this.controls['menu'].y = 112

    }
    addWindow(id) {
        let window = new Window(this)
        window.id = id
        this.controls[id] = window
        this.yoghurt.render()
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

    addWindow(id) {
        let window = new Window(this)
        this.windows[id] = window
        this.controls[id] = window
        this.emit('windowadded')
        return window
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