import Desktop from "./controls/Desktop";
import { EventEmitter } from "events";

/**
 * The entry point of the Yoghurt UI Framework
 */
export default class Yoghurt extends EventEmitter {
    constructor(graphics, theme, style) {
        super()
        this.graphics = graphics
        this._theme = theme
        this._style = style
        this.desktop = new Desktop(this)
        this.desktop.width = graphics.bounds.width
        this.desktop.height = graphics.bounds.height
        this.services = {}
        this.on('servicechanged', () => {
            this.render()
        })
        
    }
    registerService(service) {
        this.services[service.id] = service
        service.on('started', () => {
            this.emit('servicechanged')
        })
        service.on('stopped', () => {
            this.emit('servicechanged')
        })
    }
    load() {
        this.graphics.load()
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

  