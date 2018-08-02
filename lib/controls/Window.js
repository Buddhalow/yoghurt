'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_Control) {
    _inherits(Window, _Control);

    function Window(parent, id) {
        _classCallCheck(this, Window);

        var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, parent, id));

        _this.menus = {};
        _this.top = 28;
        _this.header = new _Header2.default(_this);
        _this.move = null;
        _this.controls['header'] = _this.header;
        _this.borderStyle = 'bevel';
        _this.closeOnInactivate = false;

        return _this;
    }

    _createClass(Window, [{
        key: 'close',
        value: function close() {
            delete this.parent.controls[this.id];
            this.yoghurt.render();
        }
    }, {
        key: 'startMove',
        value: function startMove(pos) {
            this.move = pos;
        }
    }, {
        key: 'activate',
        value: function activate() {
            this.zIndex = 0;
        }
    }, {
        key: 'stopMove',
        value: function stopMove() {
            this.move = null;
        }
    }, {
        key: 'pack',
        value: function pack() {
            _get(Window.prototype.__proto__ || Object.getPrototypeOf(Window.prototype), 'pack', this).call(this);
            this.header.x = 4;
            this.header.y = 4;
            this.header.height = 28;
            this.header.width = this.width - 8;
            this.header.pack();
        }
    }, {
        key: 'load',
        value: function load() {
            this.header.load();
        }
    }, {
        key: 'mouseDownAction',
        value: function mouseDownAction(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            if (_get(Window.prototype.__proto__ || Object.getPrototypeOf(Window.prototype), 'mouseDownAction', this).call(this, x, y, button)) return true;
            this.desktop.activeWindow = this;
        }

        /**
         * Render the control
         * @param {GraphicsContext} gc The Graphics Context
         */

    }, {
        key: 'render',
        value: function render(gc) {
            _get(Window.prototype.__proto__ || Object.getPrototypeOf(Window.prototype), 'render', this).call(this, gc);
            this.style.renderWindow(gc, this);
        }
    }]);

    return Window;
}(_Control3.default);

exports.default = Window;