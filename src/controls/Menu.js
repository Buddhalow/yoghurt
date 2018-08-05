import Control from '.'

export default class Menu extends Control {
    constructor(parent, id, items) {
        super(parent, id)
        this.items = items || []
        this.borderStyle = 'bevel'
        this.selectedIndex = -1
        this.borderStyle = 'bevel'
        this.alignSize()
    }

    click(x, y, button='left') {
        let item = this.items[this.selectedIndex]
        try {
            item.callback(this)
            
        } catch (e) {

        }
        this.parent.emit('action', item.id)
        this.close()    
    }
    alignSize() {
        let gc = this.graphics
        let maxSize = 0
        for (let item of this.items) {
            let width = gc.measureText(item.label).width + 22
            if (width > maxSize) {
                maxSize = width
            }
        }
        this.width = maxSize + 12
        this.height = this.items.length * 18 + 4
    }
    render(gc) {
        super.render(gc)
        this.style.renderMenu(gc, this)
        
    }
    hover(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        let itemHeight = 18
        this.selectedIndex = -1
        for (let i = 0; i < this.items.length; i++) {
            if (relativeY > i * itemHeight && relativeY < i * itemHeight + itemHeight) {
                this.selectedIndex = i
                this.yoghurt.render()
            }
        }
    }
}