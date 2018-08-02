import Control from './Control'

export default class Menu extends Control {
    constructor(parent, items) {
        super(parent)
        this.items = items || []
        this.borderStyle = 'bevel'
        this.selectedIndex = -1
        this.borderStyle = 'bevel'
        this.alignSize()
    }
    click(x, y, button='left') {
        try {
            this.items[this.selectedIndex].callback(this)
        } catch (e) {

        }
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
        let itemHeight = 18
        let i = 0
        
        gc.setFillStyle('#000')
        for (let menuitem of this.items) {
            if (this.selectedIndex == i) {
                gc.setFillStyle(this.theme.highlight)
                gc.fillRect(3, i * itemHeight + 4, this.width - 6, itemHeight - 4)
                gc.setFillStyle('#fff')
            } else {
                gc.setFillStyle('#000')
            }
            gc.fillText(menuitem.label,12, 12 + i * itemHeight, this.width, itemHeight )
            i ++
        }
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