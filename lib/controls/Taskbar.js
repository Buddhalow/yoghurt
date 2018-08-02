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

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Tray = require('./Tray');

var _Tray2 = _interopRequireDefault(_Tray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Taskbar = function (_Control) {
    _inherits(Taskbar, _Control);

    function Taskbar(parent, id) {
        _classCallCheck(this, Taskbar);

        return _possibleConstructorReturn(this, (Taskbar.__proto__ || Object.getPrototypeOf(Taskbar)).call(this, parent, id));
    }

    _createClass(Taskbar, [{
        key: 'render',
        value: function render(gc) {
            _get(Taskbar.prototype.__proto__ || Object.getPrototypeOf(Taskbar.prototype), 'render', this).call(this, gc);
            this.style.renderTaskbar(gc, this);
        }
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            _get(Taskbar.prototype.__proto__ || Object.getPrototypeOf(Taskbar.prototype), 'load', this).call(this);

            this.startButton = new _Button2.default(this);
            this.startButton.text = 'Start';
            this.startButton.left = 4;
            this.startButton.top = 5;
            this.startButton.width = 63;
            this.startButton.height = 20;
            this.controls['start'] = this.startButton;
            this.startButton.on('mousedown', function (event) {

                var menu = _this2.parent.addMenu('startmenu', [{
                    label: 'Find'
                }, {
                    label: 'Run'
                }, {
                    label: 'Exit'
                }]);
                menu.bottom = 32;
                menu.x = 8;
                _this2.yoghurt.render();
            });
            var tray = new _Tray2.default(this, 'tray');
            this.controls['tray'] = tray;
            tray.label = '00:00';
            tray.width = 55;
            tray.height = 22;
            tray.right = 12;
            tray.bottom = 3;
            this.yoghurt.render();
        }
    }]);

    return Taskbar;
}(_Control3.default);

exports.default = Taskbar;