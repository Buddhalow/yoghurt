import Control from '.'

/**
 * Text Box Element. Currently using a quirk workaround with dom element involved to ease development for now
 */
export default class TextBox extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.element = document.createElement('input')
        this.element.style.position = 'absolute'
        
    }
    get text() {
        return this.element.value
    }
    set text(value) {
        this.element.value = value
    }
    unrender() {
        super.unrender()
        if (this.element.parentNode == document.body)
        document.body.removeChild(this.element)
        this.$hasBeenRendered = false
        
    }

    render(gc) {
        super.render(gc)

        if (this.$hasBeenRendered && this.element.parentNode == null) {
            document.body.appendChild(this.element)
            console.log("Adding element")
        }
        let domX = this.yoghurt.graphics.canvas.getBoundingClientRect().x + this.absoluteX 
        let domY = this.yoghurt.graphics.canvas.getBoundingClientRect().y + this.absoluteY 
        this.element.style.left = domX + 'px'
        this.element.style.top = domY + 'px'
        this.element.style.width = this.width + 'px'
        this.element.style.height = this.height + 'px'
       
    }
}