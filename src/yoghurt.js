import Desktop from "./controls/Desktop";

export default class Yoghurt {
    constructor(graphics, theme) {
        this.graphics = graphics
        this._theme = theme
        this.desktop = new Desktop(this)
        this.desktop.width = graphics.bounds.width
        this.desktop.height = graphics.bounds.height
        
    }
    load() {
        this.desktop.load()
    }
    pack() {
        this.desktop.pack()
    }
    click(x, y, button) {
        this.desktop.click(x, y, button)
    }
    mouseDown(x, y, button) {
        this.desktop.mouseDown(x, y, button)

    }
    mouseUp(x, y, button) {
        this.desktop.mouseUp(x, y, button)

    }
    hover(x, y, button) {
        this.desktop.hover(x, y, button)

    }
    resize() {
        this.pack()
        this.desktop.width = this.graphics.bounds.width
        this.desktop.height = this.graphics.bounds.height
        this.desktop.resize()
    }
    render() {
        this.desktop.render(this.graphics)
    }

}