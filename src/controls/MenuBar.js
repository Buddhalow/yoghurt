 import Control from '.'
 import Menu from './Menu'

 export default class MenuBar extends Control {
     constructor(parent, id, menus={}) {
        super(parent, id)
        this.menus = menus
        this.selectedMenu = null
        this.paddingHorizontal = 8
        this.on('action', (actionId) => {
            this.parent.emit('action', actionId)
        })
        this.klass = 'menubar'
        this.activeMenu = null
     }
     render(gc) {
         super.render(gc)
        this.style.renderMenuBar(gc, this)

        
     }
     hover(x, y, button='left') {
        if (this.isActive) {
            this.selectMenu(x)
        }
     }
     selectMenu(x) {
        let left = 0
        if (this.selectedMenu) {
            delete this.parent.controls['menu_' +this.selectedMenu.id]
            this.selectedMenu = null
            
        }
        for (let menuId of Object.keys(this.menus)) {
            let menu = this.menus[menuId]
            let width = this.paddingHorizontal * 2 + this.graphics.measureText(menu.id || menu.text).width
            if (x > left && x < width + left) {
        
                let menuControl = new Menu(this.parent, menuId, menu)
                this.parent.controls['menu_' + menuId] = menuControl
                
                menuControl.x = left + 3
                menuControl.y = this.parent.header.height + this.height 
                menuControl.show()
                this.selectedMenu = menuControl
                this.isActive = true
            }
            left += width

        }
        this.yoghurt.render()
     }
     mouseUp() {
         this.isActive = false
         this.selectedMenu = null
         for (let control of this.parent.controls) {
             
         }
         this.yoghurt.render()
     }
     mouseDownAction(x, y, button='left') {
         this.isActive = true

        this.selectMenu(x)
     }

 }