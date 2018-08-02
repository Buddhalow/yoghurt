'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _Taskbar = require('./Taskbar');

var _Taskbar2 = _interopRequireDefault(_Taskbar);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Desktop = function (_Control) {
    _inherits(Desktop, _Control);

    function Desktop(parent, id) {
        _classCallCheck(this, Desktop);

        var _this = _possibleConstructorReturn(this, (Desktop.__proto__ || Object.getPrototypeOf(Desktop)).call(this, parent, id));

        _this.backgroundColor = _this.theme.desktop;
        _this.graphics = parent.graphics;
        _this.desktop = _this;
        _this.yoghurt = _this.parent;
        _this.windows = {};
        _this.activeWindow = null;
        _this.taskbar = new _Taskbar2.default(_this, 'taskbar');
        _this.controls['taskbar'] = _this.taskbar;

        return _this;
    }

    _createClass(Desktop, [{
        key: 'addWindow',
        value: function addWindow(id) {
            var window = new Window(this, id);
            this.windows[id] = window;
            this.controls[id] = window;
            this.emit('windowadded');
            return window;
        }
    }, {
        key: 'addMenu',
        value: function addMenu(id) {
            var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var menu = new _Menu2.default(this, id, items);
            this.controls[id] = menu;
            this.emit('windowadded');
            return menu;
        }
    }, {
        key: 'inactivateAllWindows',
        value: function inactivateAllWindows() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.values(this.controls)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var window = _step.value;

                    window.inactivate();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.activeWindow = null;
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            if (_get(Desktop.prototype.__proto__ || Object.getPrototypeOf(Desktop.prototype), 'mouseDown', this).call(this, x, y, button)) return true;
            this.inactivateAllWindows();

            this.parent.render();
        }
    }, {
        key: 'shadowedText',
        value: function shadowedText(gc, text, x, y) {
            gc.setFillStyle('#000');
            gc.fillText(text, x + 2, y + 2);
            gc.setFillStyle('#fff');
            gc.fillText(text, x, y);
        }
    }, {
        key: 'drawWarning',
        value: function drawWarning(gc, text) {
            this.shadowedText(gc, text, 22, 22);
            this.shadowedText(gc, text, this.width - gc.measureText(text).width - 22, 22);
            this.shadowedText(gc, text, 22, this.height - 22 - 22);
            this.shadowedText(gc, text, this.width - gc.measureText(text).width - 22, this.height - 22 - 22);
        }
    }, {
        key: 'render',
        value: function render(gc) {
            _get(Desktop.prototype.__proto__ || Object.getPrototypeOf(Desktop.prototype), 'render', this).call(this, gc);
            this.drawWarning(gc, 'Alpha Version');
            this.shadowedText(gc, 'Yoghurt UI Framework. (C) 2018 Alexander Forselius', this.width - 280, this.height - 82);
            this.shadowedText(gc, 'Build 0.2.8. For testing purposes only.', this.width - 280, this.height - 62);
        }
    }, {
        key: 'load',
        value: function load() {
            _get(Desktop.prototype.__proto__ || Object.getPrototypeOf(Desktop.prototype), 'load', this).call(this);
            this.emit('load');
        }
    }, {
        key: 'pack',
        value: function pack() {
            _get(Desktop.prototype.__proto__ || Object.getPrototypeOf(Desktop.prototype), 'pack', this).call(this);
            this.taskbar.x = 0;
            this.taskbar.y = this.height - this.taskbar.height;
            this.taskbar.width = this.width;
            this.taskbar.height = 30;
        }
    }]);

    return Desktop;
}(_Control3.default);

exports.default = Desktop;