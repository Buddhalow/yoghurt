import EventEmitter from 'events'
import Font from '../graphics/font'
/**
 * Control class
 */
export default class Control extends EventEmitter {
    constructor(parent, id) {
        super()
        this.id = id
        this.parent = parent
        this.font = new Font('Tahoma', 11)
        this.isMoveable = false
        this.controls = {}
        this.zIndex = 0
        this.borderStyle = 'none'
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
        this.clientBounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        this.isMouseDown = false
        this.isMouseMove = false
        this.backgroundColor = this.theme.btnFace
    }
    set desktop(value) {
        this._desktop = value
    }
    set yoghurt(value) {
        this._yoghurt = value
    }
    set graphics(value) {
        this._graphics = value
    }
    set theme(value) {
        this._theme = value
    }
    get desktop() {
        let parent = this
        do {
            if (parent._desktop) return parent._desktop
            parent = parent.parent
        } while (parent != null)
    }
    get yoghurt() {
        let parent = this
        do {
            if (parent._yoghurt) return parent._yoghurt
            parent = parent.parent
        } while (parent != null)
    }
    get style() {
        let parent = this
        do {
            if (parent._style) return parent._style
            parent = parent.parent
        } while (parent != null)
    }
    get graphics() {
        let parent = this
        do {
            if (parent._graphics) return parent._graphics
            parent = parent.parent
        } while (parent != null)
    }
    get theme() {
        let parent = this
        do {
            if (parent._theme) return parent._theme
            parent = parent.parent
        } while (parent != null)
    }
    get absoluteX() {
        let parent = this
        let x = this.x
        do {
            x += parent.x
            parent = parent.parent
        } while (parent != null)
        return x
    }
    get absoluteY() {
        let parent = this
        let y = this.y
        do {
            y += parent.y
            parent = parent.parent
        } while( parent != null)
        return y
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
    set bottom(value) {
        this.y = this.parent.height - value - this.height
    }
    set right(value) {
        this.x = this.parent.width - value - this.width
    }
    close() {
        delete this.parent.controls[this.id]
        this.yoghurt.render()
    }
    inactivate() {
        if (this.closeOnInactivate) {
            this.close()
        }
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
        return y > this.top && y < this.bottom
    }
    inBounds(x, y) {
        return this.inBoundsX(x) && this.inBoundsY(y)
    }
    /**
     * Render the control
     * @param {GraphicsContext} gc The Graphics Context
     */
    render(gc, fill=true) {
        this.style.renderControl(gc, this, fill)
    }
    redraw() {
        let gc = this.graphics
        gc.setOrigo(this.absoluteX, this.absoluteY)
        gc.translate(this.bounds.position.x, this.bounds.position.y)
        this.render(gc)
        gc.translate(-this.bounds.position.x, -this.bounds.position.y)
        gc.setOrigo(0, 0) 
        console.log("D")

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

    hover(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        for (let control of Object.values(this.controls)) {
            if (control.inBounds(relativeX, relativeY)) {
                control.hover(relativeX, relativeY, button)
            }
        }
        if (this.isMoving) {
            if (!this.move) {
                this.move = ({
                    x: relativeX,
                    y: relativeY
                })
            }
            this.left = x - this.move.x
            this.top = y - this.move.y
            this.yoghurt.render()
        }
        this.emit('hover', {
            x: x,
            y: y
        })
    }
    mouseUp(x, y, button='left') {
        this.stopMove()
        
    }
    stopMoving() {
        this.move = null
        this.isMoving = false
        }
    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    click(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        let foundControl =false
        for (let control of this.children) {
            if (control.inBounds(relativeX, relativeY)) {
                control.click(relativeX, relativeY, button)
                foundControl = true
            }
        }
        this.emit('click', {
            x: x,
            y: y
        })
        if (!foundControl) {
            this.clickAction(x, y, button)
        }
    }
    
    clickAction(x, y, button='left') {

    }
    mouseDownAction() {
        if (this.isMouseDown) return false
        this.isMouseDown = true

    }

    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    mouseDown(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        let foundControl = false
        for (let control of this.children) {
            if (control.inBounds(relativeX, relativeY)) {
                control.mouseDown(relativeX, relativeY, button)
                foundControl = true
            }
        }
        this.emit('mousedown', {
            x: x,
            y: y
        })
        if (!foundControl) {
            this.mouseDownAction(x, y, button)
        }
    }
    /**
     * Click
     * @param {*} x 
     * @param {*} y 
     */
    mouseUp(x, y, button='left') {
        this.isMouseDown = false
        let relativeX = x - this.left
        let relativeY = y - this.top
        for (let control of this.children) {
            if (control.inBounds(relativeX, relativeY)) {
               control.mouseUp(relativeX, relativeY, button)
            }
        }
        this.emit('mouseup', {
            x: x,
            y: y
        })
    }
}   