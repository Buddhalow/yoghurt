import EventEmitter from 'events'

/**
 * Control class
 */
export default class Control extends EventEmitter {
    constructor(parent) {
        super()
        this.parent = parent
        if (parent != null) {
            this.theme = parent.theme
            this.graphics = parent.graphics
        }
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
    load() {
        for (let control of Object.values(this.controls)) {
            control.load()
        }
    }
    
    get children() {
        return Object.values(this.controls)
    }
    set width(value) {
        this.bounds.size.width = value
    }
    set height(value) {
        this.bounds.size.height = value
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
    set x(value) {
        return this.bounds.position.x = value
    }

    set y(value) {
        return this.bounds.position.y = value
    }
    set left(value) {
        return this.bounds.position.x = value
    }

    set top(value) {
        return this.bounds.position.y = value
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
    
    get x() {
        return this.bounds.position.x
    }

    get y() {
        return this.bounds.position.y
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
        let fillStyle =  this.backgroundColor || this.theme.btnFace
        gc.setFillStyle(fillStyle)
        gc.fillRect(0, 0, this.width, this.height)
        for (let control of Object.values(this.controls)) {
            gc.translate(control.x, control.y)
        
            control.render(gc)
            gc.translate(-control.x, -control.y)
        }
    }
    redraw() {
        let gc = this.graphics
        gc.translate(this.bounds.position.x, this.bounds.position.y)
        this.render(gc)
        gc.translate(-this.bounds.position.x, -this.bounds.position.y)

    }
    /**
     * Pack children
     * 
     */
    pack() {
        // Pack children
        for (let control of Object.values(this.controls)) {
            control.pack()
        }
    }
    resize() {
        this.pack()
        
    }

    hover(x, y) {
        for (let control of Object.values(this.controls)) {
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