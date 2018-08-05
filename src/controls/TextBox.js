import Control from '.'

/**
 * Text Box Element. Currently using a quirk workaround with dom element involved to ease development for now
 */
export default class TextBox extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.selection = {
            start: 0,
            end: 0
        }
        this.backgroundColor = 'white'
    }
    clickAction(x, y, button) {
        let text = prompt(this.id)

        if (text) {
            this.text = text
        }
        this.yoghurt.render()
    }
    unrender() {
        super.unrender()
        this.$hasBeenRendered = false
        
    }

    render(gc) {
        super.render(gc)
        this.style.renderTextBox(gc, this)
       
    }
}