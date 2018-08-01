import Control from './Control'
import Font from '../graphics/font'

export default class Button extends Control {
    constructor(parent) {
        super(parent)
        this.buttonState = 'normal'
        this.style = 'normal'
        this.enabled = true
        this.font = new Font('Tahoma', 11)
        
    }

    render(gc) {
        gc.setFont(this.font)
        let textPositionX = this.x + (this.width / 2) - (gc.measureText(this.text).width / 2)
        let textPositionY = this.y + (this.height / 2) - (this.font.size / 2) + 2

        if (this.buttonState == 'pressed') {
            textPositionX += 2
            textPositionY += 2
        }

        gc.setFillStyle(this.theme.btnFace)
        gc.fillRect(0, 0, this.width, this.height)
        if (this.style == 'normal') {
            if (this.buttonState == 'normal') {
                gc.setStrokeStyle(this.theme.btnHighlight)
                gc.drawLine(0, 0, this.width, 0)
                gc.drawLine(0, 0, 0, this.height)
                gc.setStrokeStyle(this.theme.btnLight)
                gc.drawLine(1, 1, this.width, 1)
                gc.drawLine(1, 1, 1, this.height - 1)
                gc.setStrokeStyle(this.theme.btnShadow)
                gc.drawLine(this.width - 1, this.height - 1, 0, this.height - 1)
                gc.drawLine(this.width - 1, this.height - 1, this.width - 1, 0)
                gc.setStrokeStyle(this.theme.btnDarkShadow)
                gc.drawLine(this.width , this.height, 0, this.height)
                gc.drawLine(this.width, this.height, this.width, 0)
            }
            if (this.buttonState == 'press') {
                gc.setStrokeStyle(this.theme.btnDarkShadow)
                gc.drawRectangle(this.width - 1, 0, this.width - 1, this.height - 1)
                gc.setStrokeStyle(this.theme.btnShadow)
                gc.drawRectangle(this.width - 2, 1, this.width - 2, this.height - 2)
            }
            if (this.enabled) {
                gc.setFillStyle(this.theme.buttonText)
                gc.fillText(this.text, textPositionX, textPositionY)
            } else {
                gc.setFont(new Font('Tahoma', 8))
                gc.setFillStyle(this.theme.btnHilight)
                gc.fillText(this.text, textPositionX - 1, textPositionY - 1)
                gc.setFillStyle(this.theme.btnShadow)
                gc.fillText(this.text, textPositionX, textPositionY)

            }
        }
    }
    mouseDown() {
        super.mouseDown()
        this.buttonState = 'pressed'
        this.redraw()
    }
    mouseUp() {
        super.mouseDown()
        this.buttonState = 'normal'
    }
}