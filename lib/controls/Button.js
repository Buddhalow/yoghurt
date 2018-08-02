'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _font = require('../graphics/font');

var _font2 = _interopRequireDefault(_font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Control) {
    _inherits(Button, _Control);

    function Button(parent) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, parent));

        _this.buttonState = 'normal';
        _this.style = 'normal';
        _this.enabled = true;
        _this.font = new _font2.default('Tahoma', 11);
        _this.focused = false;

        return _this;
    }

    _createClass(Button, [{
        key: 'render',
        value: function render(gc) {
            gc.setFont(this.font);
            var textPositionX = this.x + this.width / 2 - gc.measureText(this.text).width / 2;
            var textPositionY = this.y + this.height / 2 - this.font.size / 2 + 2;

            if (this.buttonState == 'pressed') {
                textPositionX += 2;
                textPositionY += 2;
            }

            gc.setFillStyle(this.theme.btnFace);
            gc.fillRect(0, 0, this.width, this.height);
            if (this.style == 'normal') {
                if (this.buttonState == 'normal') {
                    gc.setStrokeStyle(this.theme.btnHighlight);
                    gc.drawLine(0, 0, this.width, 0);
                    gc.drawLine(0, 0, 0, this.height);
                    gc.setStrokeStyle(this.theme.btnLight);
                    gc.drawLine(1, 1, this.width, 1);
                    gc.drawLine(1, 1, 1, this.height - 1);
                    gc.setStrokeStyle(this.theme.btnShadow);
                    gc.drawLine(this.width - 1, this.height - 1, 0, this.height - 1);
                    gc.drawLine(this.width - 1, this.height - 1, this.width - 1, 0);
                    gc.setStrokeStyle(this.theme.btnDarkShadow);
                    gc.drawLine(this.width, this.height, 0, this.height);
                    gc.drawLine(this.width, this.height, this.width, 0);
                }
                if (this.buttonState == 'pressed') {
                    gc.setStrokeStyle(this.theme.btnDarkShadow);
                    gc.strokeRect(0, 0, this.width, this.height);
                    gc.setStrokeStyle(this.theme.btnShadow);
                    gc.strokeRect(1, 1, this.width - 2, this.height - 2);
                }
                if (this.enabled) {
                    gc.setFillStyle(this.theme.buttonText);
                    gc.fillText(this.text, textPositionX, textPositionY);
                } else {
                    gc.setFont(new _font2.default('Tahoma', 8));
                    gc.setFillStyle(this.theme.btnHilight);
                    gc.fillText(this.text, textPositionX - 1, textPositionY - 1);
                    gc.setFillStyle(this.theme.btnShadow);
                    gc.fillText(this.text, textPositionX, textPositionY);
                }
            }

            if (this.focused) {}
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown() {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'mouseDown', this).call(this);
            this.buttonState = 'pressed';
            this.yoghurt.render();
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp() {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'mouseUp', this).call(this);
            this.buttonState = 'normal';
            this.yoghurt.render();
        }
    }]);

    return Button;
}(_Control3.default);

exports.default = Button;