import Yoghurt from '../../src'
import CanvasGraphicsContext from '../../src/graphics/canvasgraphicscontext';
import windows95Theme from '../../src/themes/windows95'
import Window from '../../src/controls/Window'
import windows95Style from '../../src/styles/windows95'

let canvas = document.createElement('canvas')
canvas.setAttribute('width', '800')
canvas.setAttribute('height', '600')
document.body.appendChild(canvas)
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

let window = new Window(yoghurt.desktop)
window.x = 2
window.y = 2
window.width = 221
window.height = 221
yoghurt.desktop.controls['window'] = window

export default yoghurt