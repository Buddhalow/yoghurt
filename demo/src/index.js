import Yoghurt from '../../src'
import CanvasGraphicsContext from '../../src/graphics/canvasgraphicscontext';
import windows95Theme from '../../src/themes/windows95'
import windows1Theme from '../../src/themes/windows1.0'
import Window from '../../src/controls/Window'
import windows95Style from '../../src/styles/windows95'
import windows1Style from '../../src/styles/windows1.0'
import Label from '../../src/controls/Label';
import Button from '../../src/controls/Button';
import DemoApp from './apps/demo';


let canvas = document.createElement('canvas')
canvas.setAttribute('width', '800')
canvas.setAttribute('height', '600')
document.body.appendChild(canvas)


document.body.style.display = 'flex'
document.body.style.alignItems = 'center'
document.body.style.justifyContent = 'center'
let gc = new CanvasGraphicsContext(null, canvas)
let yoghurt = new Yoghurt(gc, windows95Theme, windows95Style)
gc.yoghurt = yoghurt

setInterval(() => {
    yoghurt.resize()
	yoghurt.render()
}, 100)

canvas.style.imageRendering = 'pixelated'

let demoApp = new DemoApp(yoghurt.desktop, 'demo')

yoghurt.desktop.controls['demo'] = demoApp
yoghurt.resize()
yoghurt.pack()
yoghurt.load()	
yoghurt.render()