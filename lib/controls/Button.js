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

    function Button(parent, id) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, parent, id));

        _this.buttonState = 'normal';
        _this.buttonStyle = 'normal';
        _this.enabled = true;
        _this.focused = false;

        return _this;
    }

    _createClass(Button, [{
        key: 'mouseLeave',
        value: function mouseLeave(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            this.buttonState = 'normal';
            this.yoghurt.render();
        }
    }, {
        key: 'render',
        value: function render(gc) {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'render', this).call(this, gc);
            this.style.renderButton(gc, this);
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(x, y, button) {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'mouseDown', this).call(this, x, y, button);
            this.buttonState = 'pressed';
            this.focus();
            this.yoghurt.render();
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(x, y, button) {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'mouseUp', this).call(this, x, y, button);
            this.buttonState = 'normal';
            this.yoghurt.render();
        }
    }]);

    return Button;
}(_Control3.default);

exports.default = Button;