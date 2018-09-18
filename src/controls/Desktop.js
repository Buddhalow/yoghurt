import Control from '.'
import Taskbar from './Taskbar'
import Menu from './Menu';

export default class Desktop extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.backgroundColor = 'transparent'
        this.graphics = parent.graphics
        this.desktop = this
        this.yoghurt = this.parent
        this.windows = {}
        this.activeWindow = null    
        this.taskbar = new Taskbar(this, 'taskbar')
        this.controls['taskbar'] = this.taskbar
        this.focusedControl = null
        this.icons = [
            {
                x: 12,
                y: 12,
                text: 'My Computer',
                uri: '',

            }
        ]
        this.selection = null

    }

    renderIcon(gc, icon) {
        gc.setFillStyle('#fff')
        if (icon.isSelected) {
            gc.setFillStyle(this.style.highlight)
            gc.fillRect(icon.x, icon.y + 30, 30, 18)
        }
        gc.fillText(
            icon.text,
            icon.x,
            icon.y + 30
        )
    }

    bringControlToFront(window) {
        super.bringControlToFront(window)

        delete this.controls['taskbar']
        this.controls['taskbar'] = this.taskbar
    }

    addWindow(window) {
        this.windows[window.id] = window
        this.controls[window.id] = window
        this.emit('windowadded')
        window.focus()
        return window
    }

    addMenu(id, items=[]) {
        let menu = new Menu(this, id, {items: items})
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
    desktiop(x, y) {
        if (this.selection) {
            this.selection.width = x - this.selection.x
            this.selection.height = y - this.selection.y 

            for(let icon of this.icons) {
               if (icon.x > this.selection.x - 50 && icon.y > this.selection.y - 50 && icon.x < this.selection.x + this.selection.width && icon.y < this.selection.y && this.selection.height) {
                    console.log("Selected")
                    icon.isSelected = true
               }
           }
           this.yoghurt.render()
        }
    }
    hover(x, y, button='left') {
        this.desktiop(x, y)
        super.hover(x, y, button)
    }
    mouseUp(x, y, button='left') {
        this.selection = null
           this.yoghurt.render()
        super.mouseUp(x, y, button)

    }
    mouseDown(x, y, button='left') {
        if (super.mouseDown(x, y, button)) return true
        this.inactivateAllWindows()        

        this.selection = {
            x: x,
            y: y,
            width: 0,
            height: 0
        }

        this.desktiop(x, y)
        

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
        this.unrender()
        gc.setFillStyle(this.theme.desktop)
        gc.fillRect(0, 0, this.width, this.height)
        this.drawWarning(gc, 'Alpha Version'.toUpperCase())
        this.shadowedText(gc, 'Yoghurt UI Framework. (C) 2018 Alexander Forselius', this.width - 280, this.height - 82)
        this.shadowedText(gc, 'Build 0.2.8. For testing purposes only.', this.width - 205, this.height - 62)

        for (let icon of this.icons) {
            gc.translate(icon.x, icon.y)
            this.renderIcon(gc, icon)
            gc.translate(-icon.x, -icon.y)
        }
        if (this.selection != null) {
            gc.setFillStyle('black')
            gc.strokeRect(this.selection.x, this.selection.y, this.selection.width, this.selection.height)
            console.log(this.selection)
        }

        super.render(gc)
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