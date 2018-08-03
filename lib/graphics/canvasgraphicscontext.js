'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graphicscontext = require('./graphicscontext');

var _graphicscontext2 = _interopRequireDefault(_graphicscontext);

var _font = require('./font');

var _font2 = _interopRequireDefault(_font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a graphics context
 */
var CanvasGraphicsContext = function (_GraphicsContext) {
    _inherits(CanvasGraphicsContext, _GraphicsContext);

    function CanvasGraphicsContext(canvas) {
        _classCallCheck(this, CanvasGraphicsContext);

        var _this = _possibleConstructorReturn(this, (CanvasGraphicsContext.__proto__ || Object.getPrototypeOf(CanvasGraphicsContext)).call(this));

        _this.canvas = canvas;

        _this.context2d = canvas.getContext('2d');
        _this.context2d.lineWidth = 1;
        _this.font = new _font2.default('Tahoma', 11, false, false);
        _this.matrix = {
            x: 0,
            y: 0
        };
        _this.context2d.webkitImageSmoothingEnabled = false;
        _this.context2d.translate(0.5, 0.5);
        return _this;
    }

    _createClass(CanvasGraphicsContext, [{
        key: 'resetClip',
        value: function resetClip() {
            this.context2d.resetClip();
        }
    }, {
        key: 'save',
        value: function save() {
            this.context2d.save();
        }
    }, {
        key: 'clip',
        value: function clip(x, y, width, height) {
            this.context2d.rect(this.matrix.x + x, this.matrix.y + y, width, height);
            this.context2d.clip();
        }
    }, {
        key: 'restore',
        value: function restore() {
            this.context2d.restore();
        }
    }, {
        key: 'setLineDash',
        value: function setLineDash(dash) {

            if (dash != null) this.context2d.setLineDash(dash);
        }
    }, {
        key: 'setOrigo',
        value: function setOrigo(x, y) {

            this.matrix.x += x;
            this.matrix.y += y;
        }
        /**
         * Translate the matrix
         * @param {int} x 
         * @param {int} y 
         */

    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.matrix.x += Math.round(x);
            this.matrix.y += Math.round(y);
        }
    }, {
        key: 'setFont',
        value: function setFont(font) {
            this.font = font;
            this.context2d.font = this.font.size + 'px ' + this.font.name;
        }
    }, {
        key: 'fillText',
        value: function fillText(text, x, y) {
            var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            this.context2d.fillText(text, this.matrix.x + Math.floor(x), this.matrix.y + Math.floor(y));
        }

        /**
         * Draw a line
         * @param {*} x1 
         * @param {*} y1 
         * @param {*} x2 
         * @param {*} y2 
         */

    }, {
        key: 'drawLine',
        value: function drawLine(x1, y1, x2, y2) {
            this.context2d.beginPath();
            this.context2d.moveTo(this.matrix.x + Math.floor(x1), this.matrix.y + Math.floor(y1));
            this.context2d.lineTo(this.matrix.x + Math.floor(x2), this.matrix.y + Math.floor(y2));
            this.context2d.stroke();
        }
    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height) {
            this.context2d.fillRect(this.matrix.x + x, this.matrix.y + y, width, height);
        }
    }, {
        key: 'strokeRect',
        value: function strokeRect(x, y, width, height) {
            this.context2d.strokeRect(this.matrix.x + x, this.matrix.y + y, width, height);
        }
    }, {
        key: 'measureText',
        value: function measureText(text) {
            return this.context2d.measureText(text);
        }
    }, {
        key: 'setStrokeStyle',
        value: function setStrokeStyle(stroke) {
            this.context2d.strokeStyle = stroke;
        }
    }, {
        key: 'setFillStyle',
        value: function setFillStyle(fillStyle) {
            this.context2d.fillStyle = fillStyle;
        }
    }, {
        key: 'clear',
        value: function clear(x, y, width, height) {
            this.context2d.clearRect(this.matrix.x + x, this.matrix.y + y, width, height);
        }
    }, {
        key: 'bounds',
        get: function get() {
            return {
                x: 0,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height
            };
        }
    }]);

    return CanvasGraphicsContext;
}(_graphicscontext2.default);

exports.default = CanvasGraphicsContext;