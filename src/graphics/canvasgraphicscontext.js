import GraphicsContext from './graphicscontext'
import Font from './font'
/**
 * Represents a graphics context
 */
export default class CanvasGraphicsContext extends GraphicsContext {
    constructor(canvas) {
        super()
        this.canvas = canvas
        
        this.context2d = canvas.getContext('2d')
        this.context2d.lineWidth = 1
        this.font = new Font('Tahoma', 11, false, false)
        this.matrix = {
            x: 0,
            y: 0
        }
        this.context2d.webkitImageSmoothingEnabled = false
        this.context2d.translate(0.5, 0.5)
    }

    get bounds() {
        return {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        }
    }
    setLineDash(dash) {

        if (dash != null)
        this.context2d.setLineDash(dash)
    }
    setOrigo(x, y) {

        this.matrix.x += x 
        this.matrix.y += y
    }
    /**
     * Translate the matrix
     * @param {int} x 
     * @param {int} y 
     */
    translate(x, y) {
        this.matrix.x += Math.round(x)
        this.matrix.y += Math.round(y)
    }

    setFont(font) {
        this.font = font
        this.context2d.font = this.font.size + 'px ' + this.font.name
    }

    fillText(text, x, y, width=0, height=0) {
        this.context2d.fillText(text, this.matrix.x + Math.floor(x), this.matrix.y + Math.floor(y))
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
        this.context2d.moveTo(this.matrix.x + Math.floor(x1), this.matrix.y + Math.floor(y1))
        this.context2d.lineTo(this.matrix.x + Math.floor(x2), this.matrix.y + Math.floor(y2))
        this.context2d.stroke()
    }

    fillRect(x, y, width, height) {
        this.context2d.fillRect(this.matrix.x + x,this.matrix.y +  y, width, height)
    }
    strokeRect(x, y, width, height) {
        this.context2d.strokeRect(this.matrix.x + x,this.matrix.y +  y, width, height)
    }
    measureText(text) {
        return this.context2d.measureText(text)
    }
    setStrokeStyle(stroke) {
        this.context2d.strokeStyle = stroke
    }
    setFillStyle(fillStyle) {
        this.context2d.fillStyle = fillStyle
    }
    clear(x, y, width, height) {
        this.context2d.clearRect(this.matrix.x + x, this.matrix.y +  y, width, height)
    }
}