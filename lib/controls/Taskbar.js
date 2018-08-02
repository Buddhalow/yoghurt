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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Taskbar = function (_Control) {
    _inherits(Taskbar, _Control);

    function Taskbar(parent) {
        _classCallCheck(this, Taskbar);

        return _possibleConstructorReturn(this, (Taskbar.__proto__ || Object.getPrototypeOf(Taskbar)).call(this, parent));
    }

    _createClass(Taskbar, [{
        key: 'render',
        value: function render(gc) {
            _get(Taskbar.prototype.__proto__ || Object.getPrototypeOf(Taskbar.prototype), 'render', this).call(this, gc);
            gc.setStrokeStyle(this.theme.btnHighlight);
            gc.drawLine(0, 2, this.width, 1);
        }
    }, {
        key: 'load',
        value: function load() {
            _get(Taskbar.prototype.__proto__ || Object.getPrototypeOf(Taskbar.prototype), 'load', this).call(this);

            this.startButton = new _Button2.default(this);
            this.startButton.text = 'Start';
            this.startButton.left = 4;
            this.startButton.top = 5;
            this.startButton.width = 63;
            this.startButton.height = 20;
            this.controls['start'] = this.startButton;
        }
    }]);

    return Taskbar;
}(_Control3.default);

exports.default = Taskbar;