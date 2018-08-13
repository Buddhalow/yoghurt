import Control from '.'

export default class Menu extends Control {
    constructor(parent, id, menu) {
        super(parent, id)
        this.menu = menu
        this.borderStyle = 'bevel'
        this.selectedIndex = -1
        this.borderStyle = 'bevel'
        this.alignSize()
    }

    mouseUp(x, y, button='left') {
        let item = this.menu.items[this.selectedIndex]
        try {
            item.command.call(this)
            
        } catch (e) {

        }
        this.parent.emit('action', item.id)
        this.close()    
    }

    click(x, y, button='left') {
        let item = this.menu.items[this.selectedIndex]
        try {
            item.command.call(this)
            
        } catch (e) {

        }
        this.parent.emit('action', item.id)
        this.close()    
    }
    alignSize() {
        let gc = this.graphics
        let maxSize = 0
        for (let item of this.menu.items) {
            let width = gc.measureText(item.label).width + 22
            if (width > maxSize) {
                maxSize = width
            }
        }
        this.width = maxSize + 12
        this.height = this.menu.items.length * 18 + 4
    }
    render(gc) {
        super.render(gc)
        this.style.renderMenu(gc, this)
        
    }
    hover(x, y, button='left') {
        let itemHeight = 18
        this.selectedIndex = -1
        for (let i = 0; i < this.menu.items.length; i++) {
            if (y > i * itemHeight && y < i * itemHeight + itemHeight) {
                this.selectedIndex = i
                this.yoghurt.render()
            }
        }
    }
}