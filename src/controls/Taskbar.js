import Control from './Control'
import Button from './Button'
import Menu from './Menu';
import Tray from './Tray'
import moment from 'moment'

export default class Taskbar extends Control {
    constructor(parent, id) {
        super(parent, id)
    }

    render(gc) {
        super.render(gc)
        this.style.renderTaskbar(gc, this)
    }

    load() {
        super.load()

        this.startButton = new Button(this)
        this.startButton.text = 'Start'
        this.startButton.left = 4
        this.startButton.top = 5
        this.startButton.width = 63
        this.startButton.height = 20
        this.controls['start'] = this.startButton
        this.startButton.on('mousedown', (event) => {
            
            let menu = this.parent.addMenu('startmenu', [
                {
                    label: 'Find'
                },
                {
                    label: 'Run'
                },
                {
                    label: 'Exit'
                }
            ])
            menu.bottom = 32
            menu.x = 8
            this.yoghurt.render()
        })
        let tray = new Tray(this, 'tray')
        this.controls['tray'] = tray
        tray.label = moment().format('LT')
        setInterval(() => {
            tray.label = moment().format('LT')
        }, 60000)
        tray.width = 55
        tray.height = 22
        tray.right = 12
        tray.bottom = 3
        this.yoghurt.render()
    }
}   