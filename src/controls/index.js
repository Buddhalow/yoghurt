import EventEmitter from 'events'
import Font from '../graphics/Font'
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
        this.focusedControl = null
        this.move = null
        this.resizePos = null
        this.canBeResized = false
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

    startMoveControl(obj) { 
        this.moveControl = obj
    }
    startResizeControl(obj) {
        this.resizeControl = obj
    }
    stopMoveControl() {
        this.moveControl = null
    }
    stopResizeControl() {
        this.resizeControl = null
    }
    startResize(pos) {
        console.log("Starting resizing")
        this.parent.startResizeControl(pos)
    }
    stopResize() {
        this.parent.stopResizeControl()
    }
    stopMove() {
        this.parent.stopMoveControl()
    }
    startMove(pos) {
        pos.control = this
        this.parent.startMoveControl(pos)
    }

    bringToFront() {
        this.parent.bringControlToFront(this)
    }
    bringControlToFront(window) {
        if (window.klass != 'window') return
        delete this.controls[window.id]
        this.controls[window.id] = window
        this.yoghurt.render()
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
        this.bringToFront()
        this.yoghurt.render()
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
        let objects = Object.values(this.controls)
        return objects
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
        console.log('Closing ' + this.id)
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
        let fillStyle =  this.backgroundColor
        gc.setFillStyle(fillStyle)
        gc.fillRect(0, 0, this.width, this.height)
        for (let _control of Object.values(this.controls)) {
            gc.translate(_control.x, _control.y)
        
            _control.render(gc)
            gc.translate(-_control.x, -_control.y)
        }
        this.style.renderControl(gc, this, fill)

        if (this.isInspecting) {
            gc.setFillStyle('white')
            gc.fillRect(0, 0, 100, 8)
            gc.setFillStyle('red')
            gc.setStrokeStyle('red')
            gc.strokeRect(0, 0, this.width, this.height)
            gc.setFillStyle('black')
            gc.fillText(
                'id: ' + this.id + ' x: ' + this.x + ' y: ' + this.y + ' width:' + this.width + ' height:' + this.height,
                0,
                5
            )
        }

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
        for (let control of (this.children)) {
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

    hoverAction() {

    }

    /**
     * Invoked when the mouse pointer moves above the control
     */

    hover(x, y, button='left') {
        if (this.isMouseDown) this.buttonState = 'pressed'
        let foundControl = false

        if (this.resizeControl != null) {
            this.resizeControl.control.width = x + 2 - this.resizeControl.control.x
            this.resizeControl.control.height = y + 2 - this.resizeControl.control.y
            this.resizeControl.control.pack()
            this.yoghurt.render()
        }

        if (this.moveControl != null) {
            this.moveControl.control.x = x - this.moveControl.x
            this.moveControl.control.y = y - this.moveControl.y
            this.yoghurt.render()
            
        }

        for (let control of (this.children)) {
            if (control.inBounds(x, y)) {
                control.isHovered = true
                control.hover(x - control.x, y - control.y, button)
                this.foundControl = true
            } else {
                if (control.isHovered) {
                    control.mouseLeave(x - control.x, y - control.y, button)
                }
                control.isHovered = false
            }
        }
        this.emit('hover', {
            x: x,
            y: y
        })
        if (!foundControl) {
            this.hoverAction(x, y, button)
            
        }
    }
    

    /**
     * Invoked when the mouse button upe
     */
    mouseUp(x, y, button='left') {
        this.stopMove()
        this.stopResize()
        
    }
    stopResize() {
        this.resizePos = null
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
        let foundControl =false
        for (let control of this.children) {
            if (control.inBounds(x, y)) {
                control.click(x - control.x, y - control.y, button)
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
    getControlAt(x, y) {
        for (let control of this.children) {
            if (control.inBounds(x, y) && control.parent == this) {
                return control
            }

        }
        return null
    }
    /**
     * Invoked when the mouse press
     * @param {Int} x The x coordinate of the pointer
     * @param {Int} y The y coordinate of the pointer
     * @param {String} button The button
     */
    mouseDown(x, y, button='left') {
        let foundControl = false
        
        let control = this
        let ctrl = this
        let relativeX = x
        let relativeY = y
        do {
           control = control.getControlAt(relativeX,relativeY)
           if (control != null) {
               relativeX -= control.x
               relativeY -= control.y
            ctrl = control
           }
        } while(control != null)
        console.log(ctrl)
        if (ctrl != null) {
            if (ctrl != this) {
                ctrl.mouseDown(relativeX, relativeY, button)

                let parent = ctrl
                while (parent != null && parent.klass !== 'window')  {
                    parent = parent.parent
                } 
                if (parent != null)
                parent.focus()
                if (parent != null) parent.focus()
                ctrl.mouseDownAction(x, y, button)
                if (this.canBeResized && x > this.width - 6 && y > this.height - 6) {
             
                    this.startResize({
                        x: x,
                        y: y,
                        control: this
                    })
                }
                this.emit('mousedown', {
                    sender: this,
                    x: x,
                    y: y
                })
            }
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
        for (let control of this.children) {
            if (control.inBounds(x, y)) {
               control.mouseUp(x - control.x, y - control.y, button)
            }
        }
        if (this.parent.stopMoveControl instanceof Function)
        this.parent.stopMoveControl()
        if (this.parent.stopResizeControl instanceof Function)
        this.parent.stopResizeControl()
        if (this.stopMoveControl instanceof Function)
        this.stopMoveControl()
        if (this.stopResizeControl instanceof Function)
        this.stopResizeControl()
        this.emit('mouseup', {
            x: x,
            y: y
        })
    }
}   