import Yoghurt from '../../src'
import CanvasGraphicsContext from '../../src/graphics/canvasgraphicscontext';
import win95Theme from '../../src/themes/win95'
import Window from '../../src/controls/Window'

let canvas = document.createElement('canvas')
canvas.setAttribute('width', '640')
canvas.setAttribute('height', '480')
document.body.appendChild(canvas)
let gc = new CanvasGraphicsContext(canvas)
let yoghurt = new Yoghurt(gc, win95Theme)

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


yoghurt.resize()
yoghurt.pack()
yoghurt.load()
yoghurt.render()