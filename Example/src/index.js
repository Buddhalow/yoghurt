import Yoghurt from '../../src'
import CanvasGraphicsContext from '../../src/graphics/canvasgraphicscontext';
import windows95Theme from '../../src/themes/windows95'
import windows1Theme from '../../src/themes/windows1.0'
import Window from '../../src/controls/Window'
import windows95Style from '../../src/styles/windows95'
import windows1Style from '../../src/styles/windows1.0'
import Label from '../../src/controls/Label';
import Button from '../../src/controls/Button';


let canvas = document.createElement('canvas')
canvas.setAttribute('width', '800')
canvas.setAttribute('height', '600')
document.body.appendChild(canvas)


document.body.style.display = 'flex'
document.body.style.alignItems = 'center'
document.body.style.justifyContent = 'center'
let gc = new CanvasGraphicsContext(canvas)
let yoghurt = new Yoghurt(gc, windows95Theme, windows95Style)

canvas.addEventListener('click', (e) => {
    yoghurt.click(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
    )
})
canvas.addEventListener('mousedown', (e) => {
    yoghurt.mouseDown(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
    )
})
canvas.addEventListener('mousemove', (e) => {
    yoghurt.hover(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
    )
})
canvas.addEventListener('mouseup', (e) => {
    yoghurt.mouseUp(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
    )
})

canvas.style.imageRendering = 'pixelated'

let window = new Window(yoghurt.desktop, 'window', 640, 480, {
    'file': {
        label: 'Test'
    }
})
window.title = 'Welcome to Yoghurt!'
yoghurt.desktop.controls['window'] = window

window.content.controls['start'] = new Label(window.content, 'label')
window.content.controls['start'].text = 'Welcome to Yoghurt OS Demo!'
window.content.controls['start'].width = 320
window.content.controls['start'].width = 120
window.content.controls['start'].x = 12
window.content.controls['start'].y = 52  
window.content.controls['ok'] = new Button(window.content, 'ok')
window.content.controls['ok'].top= 220
window.content.controls['ok'].left = 82
window.content.controls['ok'].width = 122
window.content.controls['ok'].height = 28
window.content.controls['ok'].text = 'OK'
window.content.backgroundColor = 'white'
window.content.controls['ok'].on('click', (e) => {
    window.close()
})

window.x = 222
window.y = 111
window.width = 321  
window.height = 321

yoghurt.resize()
yoghurt.pack()
yoghurt.load()
yoghurt.render()