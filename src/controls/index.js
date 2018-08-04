import EventEmitter from 'events'
import Font from '../graphics/font'
import { resolve } from 'uri-js';
/**
 * The {Control} class is the parent class of all graphical entities in the yoghurt user interface.
 * @class
 * @extends {EventEmitter}
 * 
 */
export default class Control extends EventEmitter {
    /**
     * Creates a new instance of the control
     * @param {Control} parent The parent control
     * @param {String} id An unique id of the instance of the control
     */
    constructor(parent, id) {
        super(parent)
        this.id = id
        this.parent = parent
        this.font = new Font('Tahoma', 11)
        this.isMoveable = false
        this.move = null
        this.resizePos = null
        this.controls = {}
        this.zIndex = 0
        this.borderStyle = 'none'
        this.isPressing = false
        this.isLoaded = false
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
        this.isVisible = true
        this.acceptButton = null
        this.cancelButton = null
        this.isResizing = false
        this.$hasBeenRendered = false
    }
    /**
     * Gets the text of the control
     */
    get text() {
        if (this._text != null) {
            return this._text
        } else {
            return this.id
        }
    }

    /**
     * Sets the text of the control
     * @param {String} value The string to set
     */

    set text(value) {
        this._text = value
    }

    startResize(pos) {
        this.resizePos = pos
    }
    stopResize() {
        this.resizePos = null
    }
    stopMove() {
        this.move = null
    }
    startMove(pos) {
       this.move = pos
    }
    

    clickAction(x, y, button='left') {
        this.emit('click', x, y, button)
        if (button === 'left') {
            this.emit('command', x, y, button)
            if (this.parent && this.parent.oktButton === this) {
                this.parent.emit('modalResult', 'ok')
            }
            if (this.parent && this.parent.cancelButton === this) {
                this.parent.emit('modalResult', 'ok')
            }
            if (this.dialogResult) {
                this.parent.emit('modalResult', this.dialogResult)
            }
        }
    }

    async showModal() {
        this.parent.controls[this.id] = this
        this.show()
        let result = await new Promise((resolve, fail) => {
            this.on('modalResult', (result) => {
                resolve(result)
            })
        })
        this.close()
        return result
    }
    remove(control) {
        delete this.controls[control.id]
    }
    add(control) {
        this.controls[control] = control
    }
    hide() {
        this.isVisible = false
        this.yoghurt.render()
        this.unrender()
    }

    /**
     * Show the control
     */
    show() {
        this.isVisible = true
        this.yoghurt.render()
        if (!this.isLoaded) this.load()
    }

    /**
     * Focus the control
     */
    focus() {
        this.desktop.focusedControl = this
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
    get isFocused() {
        return this.desktop.focusedControl == this
    }
    /**
     * Get the underlying desktop of the tree this component belongs to
     */
    get desktop() {
        let parent = this
        do {
            if (parent._desktop) return parent._desktop
            parent = parent.parent
        } while (parent != null)
    }
    /**
     * Returns the {Yoghurt} instance that hosts the system
     */
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

    /**
     * Returns an instance of the {GraphicsContext} associated with the session
     */
    get graphics() {
        let parent = this
        do {
            if (parent._graphics) return parent._graphics
            parent = parent.parent
        } while (parent != null)
    }
    /**
     * Returns the {Theme} that is currently used
     */
    get theme() {
        let parent = this
        do {
            if (parent._theme) return parent._theme
            parent = parent.parent
        } while (parent != null)
    }

    /**
     * Gets the absolute X position in coordinates relative to the viewport (canvas)
     */
    get absoluteX() {
        let parent = this
        let x = this.x
        do {
            if (!isNaN(parent.x))
            x += parent.x
            parent = parent.parent
        } while (parent != null)
        return x
    }

    /**
     * Gets the absolute Y position in coordinates relative to the viewport (canvas)
     */
    get absoluteY() {
        let parent = this
        let y = this.y
        do {
            if (!isNaN(parent.y))
            y += parent.y
            parent = parent.parent
        } while( parent != null)
        return y
    }

    load() {
        if (this.isLoaded) return
        for (let control of Object.values(this.controls)) {
            control.load()
        }
    }
    
    get children() {
        return Object.values(this.controls)
    }
    set width(value) {
        this.bounds.size.width = value
        this.resize()
    }
    set height(value) {
        this.bounds.size.height = value
        this.resize()
    }

    /**
     * Gets the width of the element
     */
    get width() {
        return this.bounds.size.width
    }


    /**
     * Gets the height of the element
     */
    get height() {
        return this.bounds.size.height
    }
    
    /**
     * Gets the relative x position of the element relative to the parent
     */
    get x() {
        return this.bounds.position.x
    }

    /**
     * Gets the relative y position of the element relative to the parent
     */
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

    /**
     * Gets the x position of the element relative to the parent's right side
     */
    get right() {
        return this.x + this.width
    }

    /**
     * Gets the x position of the element relative to the parent's bottom side
     */
    get bottom() {
        return this.y + this.height
    }

    get left() {
        return this.x
    }
    get top() {
        return this.y
    }

    /**
     * Sets the x position of the element relative to the parent's bottom side
     */
    set bottom(value) {
        this.y = this.parent.height - value - this.height
    }

    /**
     * Sets the x position of the element relative to the parent's right side
     */
    
    set right(value) {
        this.x = this.parent.width - value - this.width
    }


    /**
     * Close the element
     */
    close() {
        delete this.parent.controls[this.id] 
        debugger
        this.unrender()
        this.yoghurt.render()
    }
    inactivate() {
        if (this.closeOnInactivate) {
            this.close()
        }
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
    unrender() {
        this.$hasBeenRendered = false
        for (let _control of Object.values(this.controls)) {
           
            _control.unrender()
        }
    }
    /**
     * Renders the control
     * @param {GraphicsContext} gc The Graphics Context
     */
    render(gc, fill=true) {
        gc.save()
        gc.clip(0, 0, this.width, this.height)
        let fillStyle =  this.backgroundColor || this.theme.btnFace
        gc.setFillStyle(fillStyle)
        if (fill) gc.fillRect(0, 0, this.width, this.height)
        for (let _control of Object.values(this.controls)) {
            gc.translate(_control.x, _control.y)
        
            _control.render(gc)
            gc.translate(-_control.x, -_control.y)
        }
        this.style.renderControl(gc, this, fill)
        gc.restore()        
        this.$hasBeenRendered = true
        
    }
    /**
     * @deprecated
     */
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

    /**
     * Resizes the control
     */
    resize() {
        this.pack()
        
    }

    /**
     * Invoked when the mouse leave
     */
    mouseLeave(x, y, button) {
        this.emit('mouseleave', x, y, button)
    }

    /**
     * Invoked when the mouse pointer moves above the control
     */

    hover(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        if (this.isMouseDown) this.buttonState = 'pressed'
        for (let control of Object.values(this.controls)) {
            if (control.inBounds(relativeX, relativeY)) {
                control.isHovered = true
                control.hover(relativeX, relativeY, button)
            } else {
                if (control.isHovered) {
                    control.mouseLeave(relativeX, relativeY, button)
                }
                control.isHovered = false
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
    

    /**
     * Invoked when the mouse button upe
     */
    mouseUp(x, y, button='left') {
        this.stopMove()
        
    }
    stopMoving() {
        this.move = null
        this.isMoving = false
        }
    /**
     * Invoked when the mouse clicks
     * @param {Int} x The x coordinate of the pointer
     * @param {Int} y The y coordinate of the pointer
     * @param {String} button The button
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
    mouseDownAction() {
        if (this.isMouseDown) return false
        this.isMouseDown = true

    }
    /**
     * Invoked when the mouse press
     * @param {Int} x The x coordinate of the pointer
     * @param {Int} y The y coordinate of the pointer
     * @param {String} button The button
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
            this.mouseDownAction(relativeX, relativeY, button)
        }
    } 
    
    /**
    * Invoked when the mouse up
    * @param {Int} x The x coordinate of the pointer
    * @param {Int} y The y coordinate of the pointer
    * @param {String} button The button
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