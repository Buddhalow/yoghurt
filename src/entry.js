import Yoghurt from './yoghurt'
import CanvasGraphicsContext from './graphics/canvasgraphicscontext';
import win95Theme from './themes/win95'

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

canvas.style.imageRendering = 'pixelated'

yoghurt.load()

yoghurt.resize()
yoghurt.pack()
yoghurt.render()