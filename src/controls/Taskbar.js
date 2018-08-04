import Control from '.'
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
        this.yoghurt.on('servicechanged', () => this.pack())
        this.startButton = new Button(this)
        this.startButton.text = 'Start'
        this.controls['start'] = this.startButton
        this.startButton.on('mousedown', (event) => {
            
            let menu = this.parent.addMenu('startmenu', [
                {
                    label: 'Apps',
                    items: [
                        {
                            label: "Welcome"
                        }
                    ]
                },
                {
                    label: 'Settings'
                },
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
            menu.bottom = 28
            menu.x = 2
            this.yoghurt.render()
        })
        let tray = new Tray(this, 'tray')
        this.controls['tray'] = tray
        tray.label = moment().format('LT')
        setInterval(() => {
            tray.label = moment().format('LT')
        }, 60000)
        this.tray = tray
        this.pack()
        this.yoghurt.render()
    }
    pack() {
        super.pack()
        if (this.startButton) {
            this.startButton.left = 4
            this.startButton.top = 5
            this.startButton.width = 63
            this.startButton.height = 20
        
        }
        if (this.tray) {
            let tray = this.tray
            tray.height = 22
            tray.width = (Object.values(this.yoghurt.services).length * 18) + 60
            tray.right = 12
            tray.bottom = 3
        }
    }
}   