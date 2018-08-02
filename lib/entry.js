'use strict';

var _yoghurt = require('./yoghurt');

var _yoghurt2 = _interopRequireDefault(_yoghurt);

var _canvasgraphicscontext = require('./graphics/canvasgraphicscontext');

var _canvasgraphicscontext2 = _interopRequireDefault(_canvasgraphicscontext);

var _win = require('./themes/win95');

var _win2 = _interopRequireDefault(_win);

var _Window = require('./controls/Window');

var _Window2 = _interopRequireDefault(_Window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.createElement('canvas');
canvas.setAttribute('width', '640');
canvas.setAttribute('height', '480');
document.body.appendChild(canvas);
var gc = new _canvasgraphicscontext2.default(canvas);
var yoghurt = new _yoghurt2.default(gc, _win2.default);

canvas.addEventListener('click', function (e) {
    yoghurt.click(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
});
canvas.addEventListener('mousedown', function (e) {
    yoghurt.mouseDown(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
});
canvas.addEventListener('mousemove', function (e) {
    yoghurt.hover(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
});
canvas.addEventListener('mouseup', function (e) {
    yoghurt.mouseUp(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
});

canvas.style.imageRendering = 'pixelated';

var window = new _Window2.default(yoghurt.desktop);
window.x = 2;
window.y = 2;
window.width = 221;
window.height = 221;
yoghurt.desktop.controls['window'] = window;

yoghurt.resize();
yoghurt.pack();
yoghurt.load();
yoghurt.render();