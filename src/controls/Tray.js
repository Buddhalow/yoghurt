import Control from '.'

export default class Tray extends Control {
    constructor(parent, id) {
        super(parent, id)
        this.parent.yoghurt.on('servicechanged', () => {
            this.width = Object.values(this.parent.yoghurt.services).filter(s => s.isActive).length * 18 + 80
        })
    }
    pack() {
        
    }
    render(gc) {
        this.style.renderTray(gc, this)
    }
}