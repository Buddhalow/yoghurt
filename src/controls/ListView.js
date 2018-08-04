import Control from '.'

/**
 * Work in progress
 */
export default class ListView extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.listViewStyle = 'details'
        this.items = []
        this.columnheaders = {}
        this.selectedItems = []
        this.scroll = {
            x: 0,
            y: 0
        }
        this.backgroundColor = 'white'
    }

    renderColumnHeaders() {
        let left = 0
        for (let columnheaderId of Object.keys(this.columnheaders)) {
            let columnheader = this.columnheaders[columnheaderId]
            let button = {
                x: left,
                top: 0,
                width: columnheader.width,
                height: 18,
                text: columnheader.text
            }
            this.style.drawButton(
                gc,
                button
            )
        }
    }
    render(gc) {
        super.render(gc)
        if (this.listViewStyle === 'details') {
            this.renderColumnHeaders()
            gc.clip(0, this.top + 18, this.width, this.height - this.top + 28)
            gc.translate(this.scroll.x, this.scroll.y)
            let top = 0
            for (let item of this.items) {
                if (this.selectedItems.indexOf(item)) {
                    gc.setFillStyle(this.style.highlight)
                    gc.fillRectangle(0, top, this.width, 18)
                    gc.setFillStyle(this.style.highlightText)
                } else {
                    gc.setFillStyle('black')
                }
                let left = 0
                for (let columnheaderId of Object.keys(this.columnheaders)) {
                    let columnheader = this.columnheaders[columnheaderId]
                    let width = gc.measureText(columnheader.label) + 44
                    gc.fillText(item.label, left + 22, top + 2, width, 18)
                    left += width
                }
                top += 18
            }
            gc.translate(-this.scroll.x, -this.scroll.y)
            
        }
    }
}