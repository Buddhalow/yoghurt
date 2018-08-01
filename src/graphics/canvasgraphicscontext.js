import GraphicsContext from './graphicscontext'
import Font from './font'
/**
 * Represents a graphics context
 */
export default class CanvasGraphicsContext extends GraphicsContext {
    constructor(control, canvas) {
        super(control)
        this.canvas = canvas
        this.context2d = canvas.getContext('2d')
        this.font = new Font('Tahoma', 11, false, false)
        this.context2d = context2d
        this.canvas.addEventListener('click', (e) => {
            control.click(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
        this.canvas.addEventListener('mousedown', (e) => {
            control.mouseDown(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
    }
    /**
     * Translate the matrix
     * @param {int} x 
     * @param {int} y 
     */
    translate(x, y) {
        this.context2d.translate(x, y)
    }

    setFont(font) {
        this.font = font
    }

    fillText(text, x, y, width=0, height=0) {
        this.context2d.font = font
        this.context2d.fillText(text, x, y)
    }

    /**
     * Draw a line
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} x2 
     * @param {*} y2 
     */
    drawLine(x1, y1, x2, y2) {
        this.context2d.beginPath()
        this.context2d.moveTo(x1, y1)
        this.context2d.lineTo(x2, y2)
        this.context2d.stroke()
    }

    fillRect(x, y, width, height) {
        this.context2d.fillRect(x, y, width, height)
    }
    strokeRect(x, y, width, height) {
        this.context2d.strokeRect(x, y, width, height)
    }
    measureText(text) {
        this.context2d.measureText(text)
    }
    setStrokeStyle(stroke) {
        this.context2d.strokeStyle = stroke
    }
    setFillStyle(fillStyle) {
        this.context2d.fillStyle = fillStyle
    }
    clear(x, y, width, height) {
        this.context2d.clearRect(x, y, width, height)
    }
}