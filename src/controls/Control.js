import EventEmitter from 'events'

/**
 * Control class
 */
export default class Control extends EventEmitter {
    constructor(parent) {
        this.parent = parent
        this.controls = {}
        this.bounds = {
            size: {
                width: 0,
                height: 0
            },
            position: {
                x: 0,
                y: 0
            }
        }
    }
    get desktop() {
        let parent = this.parent
        while (parent.parent != null) {
            parent = parent.parent
        }
        return parent
    }
    get theme() {
        if (this.theme) return this.theme
        let parent = this.parent
        while (parent.parent != null && parent.theme == null) {
            parent = parent.parent
        }
        return parent.theme
    }
    get children() {
        return Object.values(this.controls)
    }
    get width() {
        return this.bounds.size.width
    }

    get height() {
        return this.bounds.size.height
    }
    
    get x() {
        return this.bounds.position.x
    }

    get y() {
        return this.bounds.position.y
    }

    get right() {
        return this.x + this.width
    }
    get bottom() {
        return this.y + this.height
    }
    get left() {
        return this.x
    }
    get top() {
        return this.y
    }
    set width(value) {
        return this.bounds.size.width = value
    }
    set height(value) {
        return this.bounds.size.height = value
    }
    
    get x(value) {
        return this.bounds.position.x = value
    }

    get y(value) {
        return this.bounds.position.y = value
    }

    get position() {
        return this.bounds.position
    }
    get size() {
        return this.bounds.size
    }

    inBoundsX(x) {
        return x > this.left && x < this.right
    }
    inBoundsY(y) {
        return y > this.top && x < this.bottom
    }
    inBounds(x, y) {
        return this.inBoundsX(x) && this.inBoundsY(y)
    }
    /**
     * Render the control
     * @param {GraphicsContext} gc The Graphics Context
     */
    render(gc) {
        gc.translate(this.bounds.position.x, this.bounds.position.y)
        for (let control of this.controls) {
            control.render(gc)
        }
        gc.translate(-this.bounds.position.x, -this.bounds.position.y)
    }

    resize() {

    }

    hover(x, y) {
        for (let control of this.controls) {
            if (control.inBounds(x, y)) {
                control.hover(x - this.x, y - this.y, button)
            }
        }
        this.emit('hover', {
            x: x,
            y: y
        })
    }

    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    click(x, y, button='left') {
        for (let control of this.controls) {
            if (control.inBounds(x, y)) {
                control.click(x - this.x, y - this.y, button)
            }
        }
        this.emit('click', {
            x: x,
            y: y
        })
    }
    
    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    mouseDown(x, y, button='left') {
        for (let control of this.controls) {
            if (control.inBounds(x, y)) {
                control.mouseDown(x - this.x, y - this.y, button)
            }
        }
        this.emit('mousedown', {
            x: x,
            y: y
        })
    }
    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    mouseUp(x, y, button='left') {
        for (let control of this.controls) {
            if (control.inBounds(x, y)) {
                control.mouseUp(x - this.x, y - this.y, button)
            }
        }
        this.emit('mouseup', {
            x: x,
            y: y
        })
    }
}