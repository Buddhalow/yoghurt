'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _font = require('../graphics/font');

var _font2 = _interopRequireDefault(_font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Control) {
    _inherits(Header, _Control);

    function Header(parent) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, parent));

        _this.rightButtons = [];
        _this.backgroundColor = _this.theme.highlight;
        _this.font = new _font2.default('Tahoma', 11);
        return _this;
    }

    _createClass(Header, [{
        key: 'mouseDown',
        value: function mouseDown(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            if (_get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'mouseDown', this).call(this, x, y, button)) return true;
            this.parent.isMoving = true;
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'mouseUp', this).call(this, x, y, button);
            this.parent.stopMoving();
        }
    }, {
        key: 'addRightButton',
        value: function addRightButton(text, id, pos) {
            var button = new _Button2.default(this);
            button.width = 20;
            button.height = 20;
            button.text = '';
            button.x = this.width - 25 - pos * 22;

            button.y = 4;
            this.controls[id] = button;
            this.rightButtons.push(button);
        }
    }, {
        key: 'load',
        value: function load() {
            _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'load', this).call(this);
            this.closeButton = this.addRightButton('x', 'closeButton', 0);
            this.maximizeButton = this.addRightButton('O', 'maximizeButton', 1);
            this.minimizeButton = this.addRightButton('_', 'minimizeButton', 2);
        }
    }, {
        key: 'render',
        value: function render(gc) {
            this.backgroundColor = this.desktop.activeWindow == this.parent ? this.theme.highlight : this.theme.inactive;

            gc.setFillStyle(this.backgroundColor);
            gc.fillRect(0, 0, this.width, this.height);
            gc.setFillStyle(this.theme.highlightText);
            gc.setFont(this.font);
            gc.fillText(this.label, 25, 16);

            _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'render', this).call(this, gc, false);
        }
    }]);

    return Header;
}(_Control3.default);

exports.default = Header;