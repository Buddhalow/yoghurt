'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Control) {
    _inherits(Menu, _Control);

    function Menu(parent, id, items) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, parent, id));

        _this.items = items || [];
        _this.borderStyle = 'bevel';
        _this.selectedIndex = -1;
        _this.borderStyle = 'bevel';
        _this.alignSize();
        return _this;
    }

    _createClass(Menu, [{
        key: 'click',
        value: function click(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            try {
                this.items[this.selectedIndex].callback(this);
            } catch (e) {}
            this.close();
        }
    }, {
        key: 'alignSize',
        value: function alignSize() {
            var gc = this.graphics;
            var maxSize = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var width = gc.measureText(item.label).width + 22;
                    if (width > maxSize) {
                        maxSize = width;
                    }
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

            this.width = maxSize + 12;
            this.height = this.items.length * 18 + 4;
        }
    }, {
        key: 'render',
        value: function render(gc) {
            _get(Menu.prototype.__proto__ || Object.getPrototypeOf(Menu.prototype), 'render', this).call(this, gc);
            this.style.renderMenu(gc, this);
        }
    }, {
        key: 'hover',
        value: function hover(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            var relativeX = x - this.left;
            var relativeY = y - this.top;
            var itemHeight = 18;
            this.selectedIndex = -1;
            for (var i = 0; i < this.items.length; i++) {
                if (relativeY > i * itemHeight && relativeY < i * itemHeight + itemHeight) {
                    this.selectedIndex = i;
                    this.yoghurt.render();
                }
            }
        }
    }]);

    return Menu;
}(_Control3.default);

exports.default = Menu;