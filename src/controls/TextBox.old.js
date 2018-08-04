import Control from '.'

export default class TextBox extends Control {
    constructor(parent, id) {
        super(parent, id)
        this._text = ''
        this.selection = {
            start: 0,
            end: 0
        }
        this.isBlink = false
        this.backgroundColor = this.style.backgroundColor
        this.caretInterval = setInterval(() => {
            this.isBlink = !this.isBlink
            this.yoghurt.render()
        }, 800)
    }

    insertAt(chars, pos) {
        this.text = [this.text.slice(0, pos), chars, this.text.slice(pos + chars.length)].join('')
    }

    removeAt(start, end) {
        this.text = this.text.slice(0, start) + this.text.slice(end, this.text.length)
    }

    keydown(keyCode) {
        if (!this.isFocused) return
        if (keyCode == 37) {
            this.selection.end--
            
        }
        if (keyCode == 38) {
            let left = 0
            let top = 0
            let x = 0
            let numChars = 0
            let y = 0
            for (let i = this.selection.end; i > 0; i--) {
                left -= width
                if (left < 0) {
                    left = control.width
                    top -= textSize
                    x = 0
                    numchars--
                }
            }
            for (let i = this.selection.end; i > 0; i--) {
                
                if (x % numChars == 0) {
                    if (x % numChars == 0) {
                        this.selection.end = i
                        if (this.isShiftPressed) {
                            this.selection.start = i
                        }
                    }
                }

                let width = gc.measureText(char).width
                
                left -= width
                if (left > control.width) {
                    left = 0
                    top -= textSize
                    x = 0
                }
                x--
            }
        }
        if (keyCode == 39) {
            this.selection.end++
            
        }
        if (keyCode == 40) {
            let left = 0
            let top = 0
            let x = 0
            let numChars = 0
            let y = 0
            for (let i = 0; i < control.text.length; i++) {
                left += width
                if (left > control.width) {
                    left = 0
                    top += textSize
                    x = 0
                    numchars++
                }
            }
            for (let i = 0; i < control.text.length; i++) {
                
                if (x % numChars == 0) {
                    if (x % numChars == 0) {
                        this.selection.end = i
                        if (this.isShiftPressed) {
                            this.selection.start = i
                        }
                    }
                }

                let width = gc.measureText(char).width
                
                left += width
                if (left > control.width) {
                    left = 0
                    top += textSize
                    x = 0
                }
                x++
            }
        }
        if (this.selection.end < this.selection.start) {
            let start = this.selection.end
            let end = this.selection.start
            this.selection.start = start
            this.selection.end = end
        }
        if (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90) {
            let char = String.fromCharCode(keyCode)
            this.insertAt(char, this.selection.start)
        }
    }

    mouseDown(x, y, button='left') {
        let relativeX = x - this.left
        let relativeY = y - this.top
        this.involve(relativeX, relativeY)
    }

    involve(mouseX, mouseY) {
        let x = 0
        let y = 0
        let left = 2
        let top = 2
        let textSize = this.font.size
        for (let char of this.text) {

            let width = this.graphics.measureText(char).width
            if (mouseX > left && mouseX < left + width && mouseY > top && mouseY < top + textSize) {
                if (this.shift) {
                    this.selection.end = x
                    if (this.selection.end < this.selection.start) {
                        let start = this.selection.end
                        let end = this.selection.start
                        this.selection.start = start
                        this.selection.end = end
                    }
                } else {
                    this.selection.end = x
                    this.selection.start = x
                }
            }

            left += width
            if (left > this.width) {
                left = 0
                top += textSize
            }
            x++
        }
    }

    render(gc) {
        this.style.renderTextBox(
            gc,
            this
        )
    }
}