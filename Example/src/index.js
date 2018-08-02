import Yoghurt from '../../src'
import CanvasGraphicsContext from '../../src/graphics/canvasgraphicscontext';
import windows95Theme from '../../src/themes/windows95'
import Window from '../../src/controls/Window'
import windows95Style from '../../src/styles/windows95'
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

let window = new Window(yoghurt.desktop, 'window')
window.x = 222
window.y = 111
window.width = 321
window.height = 321
window.title = 'Welcome to Yoghurt!'
yoghurt.desktop.controls['window'] = window

window.controls['start'] = new Label(window, 'label')
window.controls['start'].text = 'Welcome to Yoghurt OS Demo!'
window.controls['start'].width = 320
window.controls['start'].width = 120
window.controls['start'].x = 12
window.controls['start'].y = 52  
window.controls['ok'] = new Button(window, 'ok')
window.controls['ok'].bottom = 52
window.controls['ok'].left = 82
window.controls['ok'].width = 122
window.controls['ok'].height = 28
window.controls['ok'].text = 'OK'
window.controls['ok'].on('click', (e) => {
    window.close()
})
export default yoghurt