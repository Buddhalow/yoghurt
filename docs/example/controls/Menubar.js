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

var MenuBar = function (_Control) {
    _inherits(MenuBar, _Control);

    function MenuBar(parent, id) {
        var menus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, MenuBar);

        var _this = _possibleConstructorReturn(this, (MenuBar.__proto__ || Object.getPrototypeOf(MenuBar)).call(this, parent, id));

        _this.menus = menus;
        _this.selectedMenu = null;
        _this.paddingHorizontal = 28;
        return _this;
    }

    _createClass(MenuBar, [{
        key: 'render',
        value: function render(gc) {
            _get(MenuBar.prototype.__proto__ || Object.getPrototypeOf(MenuBar.prototype), 'render', this).call(this, gc);
            this.style.renderMenuBar(gc, this);
        }
    }, {
        key: 'mouseDownAction',
        value: function mouseDownAction(relativeX, relativeY) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            var left = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.menus)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var menuId = _step.value;

                    var menu = this.menus[menuId];
                    var width = this.paddingHorizontal * 2 + this.graphics.measureString(menu).width;
                    if (relativeX > left && relativeX < width + left) {
                        var menuControl = new Menu(this.parent, menuId);
                        this.parent.controls['menu_' + menuId] = menuControl;
                        menuControl.x = left;
                        menuControl.y = this.parent.y + this.parent.header.height + this.height - 2;
                        menuControl.show();
                    }
                    left += width;
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
        }
    }]);

    return MenuBar;
}(_Control3.default);

exports.default = MenuBar;