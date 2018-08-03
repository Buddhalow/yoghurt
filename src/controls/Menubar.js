 import Control from './Control'

 export default class MenuBar extends Control {
     constructor(parent, id, menus={}) {
        super(parent, id)
        this.menus = menus
        this.selectedMenu = null
        this.paddingHorizontal = 28
     }
     render(gc) {
        super.render(gc)
        this.style.renderMenuBar(gc, this)
     }
     mouseDownAction(relativeX, relativeY, button='left') {
        let left = 0
        for (let menuId of Object.keys(this.menus)) {
            let menu = this.menus[menuId]
            let width = this.paddingHorizontal * 2 + this.graphics.measureString(menu).width
            if (relativeX > left && relativeX < width + left) {
                let menuControl = new Menu(this.parent, menuId)
                this.parent.controls['menu_' + menuId] = menuControl
                menuControl.x = left
                menuControl.y = this.parent.y + this.parent.header.height + this.height -2
                menuControl.show()
            }
            left += width

        }
     }

 }