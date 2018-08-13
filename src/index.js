export { default as Desktop } from "./controls/Desktop";
import Desktop from './controls/Desktop'
import { EventEmitter } from "events";

export { default as Control } from './controls'


export { default as Taskbar }  from './controls/Taskbar'
export { default as Window } from './controls/Window'
export { default as Menu } from './controls/Menu'
export { default as MenuBar } from './controls/MenuBar'
export { default as Label } from './controls/Label'
export { default as Button } from './controls/Button'
export { default as ToolBar } from './controls/Toolbar'
export { default as ToolbarPanel } from './controls/ToolbarPanel'
export { default as Tray } from './controls/Tray'
export { default as Header } from './controls/Header'
export { default as ListView } from './controls/ListView'
export { default as TextBox } from './controls/TextBox'

export { default as App } from './apps'
export { default as GraphicsContext } from './graphics'
export { default as Service } from './services'

export { default as Style } from './styles'

export {default as windows1Style } from './styles/windows1.0'
export {default as windows10Style } from './styles/windows10.0'
export {default as windows95Style }from './styles/windows95'

export { default as Theme } from './themes'

/**
 * The entry point of the Yoghurt UI Framework
 */
export default class Yoghurt extends EventEmitter {
    constructor(graphics, theme, style, isCrt=false) {
        super()
        this.isCrt = isCrt
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
        if (this.isCrt) {
            this.graphics.crt()
        }
    }
}

  