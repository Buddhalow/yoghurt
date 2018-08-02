import Style from '.'

class Windows95Style extends Style {
    renderTray(gc, control) {
        gc.setFont(control.font)
        let textPositionX = (control.width / 2) - (gc.measureText(control.text).width / 2)
        let textPositionY = (control.height / 2)
        gc.setStrokeStyle(control.theme.btnShadow)
        gc.setFillStyle(control.theme.buttonText)
        gc.drawLine(0, 0, control.width, 0)
        gc.drawLine(0, 0, 0, control.height)
        gc.setStrokeStyle(control.theme.btnHighlight)
        gc.drawLine(control.width , control.height, 0, control.height)
        gc.drawLine(control.width, control.height, control.width, 0)
        gc.fillText(control.label, textPositionX, textPositionY)
    }
    renderButton(gc, control) {
        // Draws button
        gc.setFont(control.font)
        let textPositionX = (control.width / 2) - (gc.measureText(control.text).width / 2)
        let textPositionY = (control.height / 2) - (control.font.size / 2) + 8

        if (control.buttonState == 'pressed') {
            textPositionX += 2
            textPositionY += 2
        }

        gc.setFillStyle(control.theme.btnFace)
        gc.fillRect(0, 0, control.width, control.height)
        if (control.buttonStyle == 'normal') {
            if (control.buttonState == 'normal') {
                gc.setStrokeStyle(control.theme.btnHighlight)
                gc.drawLine(0, 0, control.width, 0)
                gc.drawLine(0, 0, 0, control.height)
                gc.setStrokeStyle(control.theme.btnLight)
                gc.drawLine(1, 1, control.width, 1)
                gc.drawLine(1, 1, 1, control.height - 1)
                gc.setStrokeStyle(control.theme.btnShadow)
                gc.drawLine(control.width - 1, control.height - 1, 0, control.height - 1)
                gc.drawLine(control.width - 1, control.height - 1, control.width - 1, 0)
                gc.setStrokeStyle(control.theme.btnDarkShadow)
                gc.drawLine(control.width , control.height, 0, control.height)
                gc.drawLine(control.width, control.height, control.width, 0)
            }
            if (control.buttonState == 'pressed') {
                gc.setStrokeStyle(control.theme.btnDarkShadow)
                gc.strokeRect(0, 0, control.width, control.height)
                gc.setStrokeStyle(control.theme.btnShadow)
                gc.strokeRect(1, 1, control.width - 2  , control.height - 2)
            }
            if (control.enabled) {
                gc.setFillStyle(control.theme.buttonText)
                gc.fillText(control.text, textPositionX, textPositionY)
            } else {
                gc.setFont(new Font('Tahoma', 8))
                gc.setFillStyle(control.theme.btnHilight)
                gc.fillText(control.text, textPositionX - 1, textPositionY - 1)
                gc.setFillStyle(control.theme.btnShadow)
                gc.fillText(control.text, textPositionX, textPositionY)

            }
        }

        if (control.isFocused) {
            gc.setLineDash([2])
            gc.setStrokeStyle('#000')
            gc.setLineDash([2])
            if (control.buttonState == 'pressed') {
                gc.strokeRect(4, 4, control.width - 7, control.height - 7)

            } else {
                gc.strokeRect(3, 3, control.width - 6, control.height - 6)
            }
            gc.setLineDash([1])
            gc.strokeRect(-1, -1, control.width + 2, control.height + 2)
            gc.setLineDash([1])
        }
    } 
    renderWindow(gc, control, fill=true) {

    }
    renderTaskbar(gc, control, fill=true) {
        gc.setStrokeStyle(control.theme.btnHighlight)
        gc.drawLine(0, 2, control.width, 1)
    }
    renderMenu(gc, control, fill=true) {
        let itemHeight = 18
        let i = 0
        
        gc.setFillStyle('#000')
        for (let menuitem of control.items) {
            if (control.selectedIndex == i) {
                gc.setFillStyle(control.theme.highlight)
                gc.fillRect(3, i * itemHeight + 4, control.width - 6, itemHeight - 4)
                gc.setFillStyle('#fff')
            } else {
                gc.setFillStyle('#000')
            }
            gc.fillText(menuitem.label,12, 12 + i * itemHeight, control.width, itemHeight )
            i ++
        }
    } 
    renderHeader(gc, control, fill=true) {
        control.backgroundColor = (control.desktop.activeWindow  == control.parent ? control.theme.highlight : control.theme.inactive)
        gc.setFillStyle(control.backgroundColor)
        gc.fillRect(0, 0, control.width, control.height)
        gc.setFillStyle(control.theme.highlightText)
        gc.setFont(control.font) 
        gc.fillText(control.label, 25, 16)
    }
    renderControl(gc, control, fill=true) {
        let fillStyle =  control.backgroundColor || control.theme.btnFace
        gc.setFillStyle(fillStyle)
        if (fill) gc.fillRect(0, 0, control.width, control.height)
        for (let _control of Object.values(control.controls)) {
            gc.translate(_control.x, _control.y)
        
            _control.render(gc)
            gc.translate(-_control.x, -_control.y)
        }
        if (control.borderStyle === 'bevel') {
            gc.setStrokeStyle(control.theme.btnHighlight)
            gc.drawLine(2, 2, control.width, 2)
            gc.drawLine(2, 2, 2, control.height)
            gc.setStrokeStyle(control.theme.btnShadow)
            gc.drawLine(control.width - 1, 0, control.width - 1, control.height - 1)
            gc.drawLine(0, control.height - 1, control.width - 1, control.height - 1)
            gc.setStrokeStyle(control.theme.btnDarkShadow) 
            gc.drawLine(control.width, 0, control.width, control.height)
            gc.drawLine(0, control.height, control.width, control.height)
        }
    }
}

export default new Windows95Style()