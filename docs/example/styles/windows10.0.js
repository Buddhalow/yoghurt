'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Windows95Style = function (_Style) {
    _inherits(Windows95Style, _Style);

    function Windows95Style() {
        _classCallCheck(this, Windows95Style);

        return _possibleConstructorReturn(this, (Windows95Style.__proto__ || Object.getPrototypeOf(Windows95Style)).apply(this, arguments));
    }

    _createClass(Windows95Style, [{
        key: 'renderTray',
        value: function renderTray(gc, control) {
            gc.setFont(control.font);
            var textPositionX = control.width / 2 - gc.measureText(control.text).width / 2;
            var textPositionY = control.height / 2;
            gc.setStrokeStyle(control.theme.btnShadow);
            gc.setFillStyle(control.theme.buttonText);
            gc.drawLine(0, 0, control.width, 0);
            gc.drawLine(0, 0, 0, control.height);
            gc.setStrokeStyle(control.theme.btnHighlight);
            gc.drawLine(control.width, control.height, 0, control.height);
            gc.drawLine(control.width, control.height, control.width, 0);
            gc.fillText(control.label, textPositionX, textPositionY);
        }
    }, {
        key: 'renderButton',
        value: function renderButton(gc, control) {
            // Draws button
            gc.setFont(control.font);
            var textPositionX = control.width / 2 - gc.measureText(control.text).width / 2;
            var textPositionY = control.height / 2 - control.font.size / 2 + 8;

            if (control.buttonState == 'pressed') {
                textPositionX += 2;
                textPositionY += 2;
            }

            gc.setStrokeStyle('#000');
            gc.strokeRect(0, 0, control.width, control.height);
            if (control.buttonStyle == 'normal') {
                if (control.buttonState == 'normal') {
                    gc.strokeRect(0, 0, this.width, this.height);
                }
                gc.setFillStyle('#000');
                if (control.buttonState == 'pressed') {
                    gc.fillRect(0, 0, this.width, this.height);
                    gc.setFillStyle('white');
                }
                gc.fillText(control.text, textPositionX, textPositionY);
            }

            if (control.isFocused) {
                gc.setLineDash([2]);
                gc.setStrokeStyle('#000');
                gc.setLineDash([2]);
                if (control.buttonState == 'pressed') {
                    gc.strokeRect(4, 4, control.width - 7, control.height - 7);
                } else {
                    gc.strokeRect(3, 3, control.width - 6, control.height - 6);
                }
                gc.setLineDash([1]);
                gc.strokeRect(-1, -1, control.width + 2, control.height + 2);
                gc.setLineDash([1]);
            }
        }
    }, {
        key: 'renderWindow',
        value: function renderWindow(gc, control) {
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        }
    }, {
        key: 'renderTaskbar',
        value: function renderTaskbar(gc, control) {
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            gc.setStrokeStyle(control.theme.btnHighlight);
            gc.drawLine(0, 2, control.width, 1);
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu(gc, control) {
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var itemHeight = 18;
            var i = 0;

            gc.setFillStyle('#000');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = control.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var menuitem = _step.value;

                    if (control.selectedIndex == i) {
                        gc.setFillStyle(control.theme.highlight);
                        gc.fillRect(3, i * itemHeight + 4, control.width - 6, itemHeight - 4);
                        gc.setFillStyle('#fff');
                    } else {
                        gc.setFillStyle('#000');
                    }
                    gc.fillText(menuitem.label, 12, 12 + i * itemHeight, control.width, itemHeight);
                    i++;
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
    }, {
        key: 'renderHeader',
        value: function renderHeader(gc, control) {
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            control.backgroundColor = control.desktop.activeWindow == control.parent ? control.theme.highlight : control.theme.inactive;
            gc.setFillStyle(control.backgroundColor);
            gc.fillRect(0, 0, control.width, control.height);
            gc.setFillStyle(control.theme.highlightText);
            gc.setFont(control.font);
            gc.fillText(control.label, 25, 16);
        }
    }, {
        key: 'renderMenuBar',
        value: function renderMenuBar(gc, control) {
            var left = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(control.menus)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var menuId = _step2.value;

                    var menu = control.menus[menuId];
                    if (control.selectedMenu === menu) {
                        gc.setFillStyle(control.style.highlightText);
                        gc.fillRect(left, 0, gc.measureText(menu.label).width + control.paddingHorizontal, control.height);
                        gc.setFillStyle(control.style.highlight);
                    } else {
                        gc.setFillStyle('black');
                    }
                    gc.fillText(menu.label, left + control.paddingHorizontal, 0, gc.measureText(menu.label).width + control.paddingHorizontal * 2, this.height);
                    left += c.measureText(menu.label).width + control.paddingHorizontal;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl(gc, control) {
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var fillStyle = control.backgroundColor || control.theme.btnFace;
            gc.setFillStyle(fillStyle);
            if (fill) gc.fillRect(0, 0, control.width, control.height);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.values(control.controls)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _control = _step3.value;

                    gc.translate(_control.x, _control.y);

                    _control.render(gc);
                    gc.translate(-_control.x, -_control.y);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (control.borderStyle === 'bevel') {
                gc.setStrokeStyle('black');
                gc.strokeRect(0, 0, this.width, this.height);
            }
        }
    }]);

    return Windows95Style;
}(_2.default);

exports.default = new Windows95Style();