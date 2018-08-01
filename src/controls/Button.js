import Control from './Control'

export default class Button extends Control {
    constructor(parent) {
        super(parent)
        this.buttonState = 'normal'
        this.style = 'normal'
        this.enabled = true
        
    }

    render(gc) {
        let textPositionX = this.width / 2 - (gc.measureText(this.text).width / 2)
        let textPositionY = this.height / 2 - (gc.measureText(this.text).height / 2)
        
        if (this.buttonState == 'pressed') {
            textPositionX += 2
            textPositionY += 2
        }

        gc.setFillStyle(this.theme.btnFace)
        gc.fillRect(0, 0, this.width, this.height)
        if (this.style == 'normal') {
            if (this.buttonState == 'normal') {
                gc.setStrokeStyle(this.theme.btnHilight)
                gc.drawLine(this.width - 1, 0, 0, this.width - 1, this.height -1)
                gc.drawLine(0, this.height - 1, 0, this.height - 1, this.width -1)
                gc.setStrokeStyle(this.theme.btnLight)
                gc.drawLine(this.width - 2, 1, this.width - 2, this.height -1)
                gc.drawLine(1, this.height - 1, 0, this.height - 1, this.width -1)
                gc.setStrokeStyle(this.theme.btnShadow)
                gc.drawLine(1 , 1, this.width - 1, 1)
                gc.setStrokeStyle(this.theme.btnDarkShadow)
                gc.drawLine(1, 1, 1, this.height - 1)
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
    }
    mouseUp() {
        super.mouseDown()
        this.buttonState = 'normal'
    }
}