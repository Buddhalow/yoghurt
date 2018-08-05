import Style from '.'

class Windows95Style extends Style {
    renderTray(gc, control) {

        let services = Object.values(control.yoghurt.services).filter(s => s.isActive)
        let left = 0
        let iconSize = 18
        for (let service of services) {
            gc.drawImage(service.icon, left, 2, iconSize, iconSize, 0, 0, service.icon.width, service.icon.height) 
          
            left += iconSize
            left++
        }

        gc.setFont(control.font)
        let textPositionX = left + (gc.measureText(control.text).width / 2)
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

    drawBevel(gc, control) {
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
    drawInset(gc, control) {
        gc.drawLine(0, 0, control.width, 0)
        gc.drawLine(0, 0, 0, control.height)
        gc.setStrokeStyle(control.theme.btnShadow)
        gc.drawLine(1, 1, control.width, 1)
        gc.drawLine(1, 1, 1, control.height - 1)
        gc.setStrokeStyle(control.theme.btnLight)
        gc.drawLine(control.width - 1, control.height - 1, 0, control.height - 1)
        gc.drawLine(control.width - 1, control.height - 1, control.width - 1, 0)
        gc.setStrokeStyle(control.theme.btnHighlight)
        gc.drawLine(control.width , control.height, 0, control.height)
        gc.drawLine(control.width, control.height, control.width, 0)
    }

    renderTextBox(gc, control) {
        this.drawInset(gc, control)
        gc.setFont(control.font)
        let x = 0
        let y = 0
        let left =  2
        let top = 12
        let textSize = control.font.size
        for (let char of control.text) {
            let width = gc.measureText(char).width
            if (x >= control.selection.start && x <= control.selection.end && control.selection.end != control.selection.start ) {
                gc.setFillStyle(control.style.highlight)
                gc.fillRect(left, top, width, textSize) // Fill mark
                gc.setFillStyle(control.style.highlightText)
            } else {
                gc.setFillStyle(control.style.text)
            }
            gc.fillText(char, left, top)
            if (x == control.selection.end) {
                gc.setStrokeStyle(control.style.text)
                if (control.isBlink) {
                    gc.drawLine(left, top, left, control.height - 2)
                }
            }

            left += width
            if (left > control.width) {
                left = 0
                top += textSize
            }
        }        
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
        
        if (control.buttonStyle == 'tool') {
            if (control.buttonState == 'normal') {
                if (control.isChecked) {
                    gc.setFillStyle('white')
                    gc.fillRect(0, 0, control.width, control.height)
                    gc.setStrokeStyle(control.theme.btnDarkShadow)
                    gc.drawLine(0, 0, control.width, 0)
                    gc.drawLine(0, 0, 0, control.height)
                    gc.setStrokeStyle(control.theme.btnShadow)
                    gc.drawLine(1, 1, control.width, 1)
                    gc.drawLine(1, 1, 1, control.height - 1)
                    gc.setStrokeStyle(control.theme.btnLight)
                    gc.drawLine(control.width - 1, control.height - 1, 0, control.height - 1)
                    gc.drawLine(control.width - 1, control.height - 1, control.width - 1, 0)
                    gc.setStrokeStyle(control.theme.btnHighlight)
                    gc.drawLine(control.width , control.height, 0, control.height)
                    gc.drawLine(control.width, control.height, control.width, 0)
                } else {
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
            }
            if (control.buttonState == 'pressed') {
                gc.setStrokeStyle(control.theme.btnDarkShadow)
                gc.drawLine(0, 0, control.width, 0)
                gc.drawLine(0, 0, 0, control.height)
                gc.setStrokeStyle(control.theme.btnShadow)
                gc.drawLine(1, 1, control.width, 1)
                gc.drawLine(1, 1, 1, control.height - 1)
                gc.setStrokeStyle(control.theme.btnLight)
                gc.drawLine(control.width - 1, control.height - 1, 0, control.height - 1)
                gc.drawLine(control.width - 1, control.height - 1, control.width - 1, 0)
                gc.setStrokeStyle(control.theme.btnHighlight)
                gc.drawLine(control.width , control.height, 0, control.height)
                gc.drawLine(control.width, control.height, control.width, 0)
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
        if (control.isFocused && control.isFocusable) {
            gc.setLineDash([2])
            gc.setStrokeStyle('#000')
            gc.setLineDash([1, 2    ])
            if (control.buttonState == 'pressed') {
                gc.strokeRect(4, 4, control.width - 8, control.height - 8)

            } else {
                gc.strokeRect(3, 3, control.width - 7, control.height - 7)
            }
            gc.setLineDash([1])
            if (control.buttonStyle === 'normal')
                gc.strokeRect(-1, -1, control.width + 2, control.height + 2)
            gc.setLineDash([1])
        }
    } 
    renderToolBar(gc, control) {
    }
    renderMenuBar(gc, control) {
        let left = 0
        console.log(control)
        if (control.menus)
        for (let menuId of Object.keys(control.menus)) {
            let menu = control.menus[menuId]
            if (control.selectedMenu === menu) {
                gc.setFillStyle(control.style.highlightText)
                gc.fillRect(left , 0, gc.measureText(menu.label).width + control.paddingHorizontal, control.height)
                gc.setFillStyle(control.style.highlight)
            } else {
                gc.setFillStyle('#000')
            }
            gc.fillText(
                menu.label || menu.id,
                left + control.paddingHorizontal,
                22,
                gc.measureText(menu.label).width + control.paddingHorizontal * 2,
                this.height
            )
            left += gc.measureText(menu.label).width + control.paddingHorizontal
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
        gc.fillText(control.text || control.parent.text, 25, 12)
    }
    renderControl(gc, control, fill=true) {
        
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
        if (control.borderStyle === 'inset') {
            this.drawInset(gc, control)
            
        }
    }
}

export default new Windows95Style()