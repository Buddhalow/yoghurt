'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Control class
 */
var Control = function (_EventEmitter) {
    _inherits(Control, _EventEmitter);

    function Control(parent) {
        _classCallCheck(this, Control);

        var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this));

        _this.parent = parent;
        _this.isMoveable = false;
        _this.controls = {};
        _this.zIndex = 0;
        _this.borderStyle = 'none';
        _this.bounds = {
            size: {
                width: 0,
                height: 0
            },
            position: {
                x: 0,
                y: 0
            }
        };
        _this.clientBounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        _this.isMouseDown = false;
        _this.isMouseMove = false;
        _this.backgroundColor = _this.theme.btnFace;
        return _this;
    }

    _createClass(Control, [{
        key: 'load',
        value: function load() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.values(this.controls)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var control = _step.value;

                    control.load();
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
        key: 'inBoundsX',
        value: function inBoundsX(x) {
            return x > this.left && x < this.right;
        }
    }, {
        key: 'inBoundsY',
        value: function inBoundsY(y) {
            return y > this.top && y < this.bottom;
        }
    }, {
        key: 'inBounds',
        value: function inBounds(x, y) {
            return this.inBoundsX(x) && this.inBoundsY(y);
        }
        /**
         * Render the control
         * @param {GraphicsContext} gc The Graphics Context
         */

    }, {
        key: 'render',
        value: function render(gc) {
            var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var fillStyle = this.backgroundColor || this.theme.btnFace;
            gc.setFillStyle(fillStyle);
            if (fill) gc.fillRect(0, 0, this.width, this.height);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.values(this.controls)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var control = _step2.value;

                    gc.translate(control.x, control.y);

                    control.render(gc);
                    gc.translate(-control.x, -control.y);
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

            if (this.borderStyle === 'bevel') {
                gc.setStrokeStyle(this.theme.btnHighlight);
                gc.drawLine(2, 2, this.width, 2);
                gc.drawLine(2, 2, 2, this.height);
                gc.setStrokeStyle(this.theme.btnShadow);
                gc.drawLine(this.width - 1, 0, this.width - 1, this.height - 1);
                gc.drawLine(0, this.height - 1, this.width - 1, this.height - 1);
                gc.setStrokeStyle(this.theme.btnDarkShadow);
                gc.drawLine(this.width, 0, this.width, this.height);
                gc.drawLine(0, this.height, this.width, this.height);
            }
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            var gc = this.graphics;
            gc.setOrigo(this.absoluteX, this.absoluteY);
            gc.translate(this.bounds.position.x, this.bounds.position.y);
            this.render(gc);
            gc.translate(-this.bounds.position.x, -this.bounds.position.y);
            gc.setOrigo(0, 0);
        }
        /**
         * Pack children
         * 
         */

    }, {
        key: 'pack',
        value: function pack() {
            // Pack children
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.values(this.controls)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var control = _step3.value;

                    control.pack();
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
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.pack();
        }
    }, {
        key: 'hover',
        value: function hover(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            var relativeX = x - this.left;
            var relativeY = y - this.top;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.values(this.controls)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var control = _step4.value;

                    if (control.inBounds(relativeX, relativeY)) {
                        if (control.hover(relativeX, relativeY, button)) return true;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (this.isMoving) {
                if (!this.move) {
                    this.move = {
                        x: relativeX,
                        y: relativeY
                    };
                }
                this.left = x - this.move.x;
                this.top = y - this.move.y;
                this.yoghurt.render();
            }
            this.emit('hover', {
                x: x,
                y: y
            });
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            this.stopMove();
        }
    }, {
        key: 'stopMoving',
        value: function stopMoving() {
            this.move = null;
            this.isMoving = false;
        }
        /**
         * Click
         * @param {*} x 
         * @param {*} y 
         */

    }, {
        key: 'click',
        value: function click(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            var relativeX = x - this.left;
            var relativeY = y - this.top;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var control = _step5.value;

                    if (control.inBounds(relativeX, relativeY)) {
                        if (control.click(relativeX, relativeY, button)) return true;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            this.emit('click', {
                x: x,
                y: y
            });
        }

        /**
         * Click
         * @param {*} x 
         * @param {*} y 
         */

    }, {
        key: 'mouseDown',
        value: function mouseDown(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            if (this.isMouseDown) return;
            this.isMouseDown = true;
            var relativeX = x - this.left;
            var relativeY = y - this.top;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var control = _step6.value;

                    if (control.inBounds(relativeX, relativeY)) {
                        if (control.mouseDown(relativeX, relativeY, button)) return true;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            this.emit('mousedown', {
                x: x,
                y: y
            });
        }
        /**
         * Click
         * @param {*} x 
         * @param {*} y 
         */

    }, {
        key: 'mouseUp',
        value: function mouseUp(x, y) {
            var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';

            this.isMouseDown = false;
            var relativeX = x - this.left;
            var relativeY = y - this.top;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var control = _step7.value;

                    if (control.inBounds(relativeX, relativeY)) {
                        if (control.mouseUp(relativeX, relativeY, button)) return true;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            this.emit('mouseup', {
                x: x,
                y: y
            });
        }
    }, {
        key: 'desktop',
        set: function set(value) {
            this._desktop = value;
        },
        get: function get() {
            var parent = this;
            do {
                if (parent._desktop) return parent._desktop;
                parent = parent.parent;
            } while (parent != null);
        }
    }, {
        key: 'yoghurt',
        set: function set(value) {
            this._yoghurt = value;
        },
        get: function get() {
            var parent = this;
            do {
                if (parent._yoghurt) return parent._yoghurt;
                parent = parent.parent;
            } while (parent != null);
        }
    }, {
        key: 'graphics',
        set: function set(value) {
            this._graphics = value;
        },
        get: function get() {
            var parent = this;
            do {
                if (parent._graphics) return parent._graphics;
                parent = parent.parent;
            } while (parent != null);
        }
    }, {
        key: 'theme',
        set: function set(value) {
            this._theme = value;
        },
        get: function get() {
            var parent = this;
            do {
                if (parent._theme) return parent._theme;
                parent = parent.parent;
            } while (parent != null);
        }
    }, {
        key: 'absoluteX',
        get: function get() {
            var parent = this;
            var x = this.x;
            do {
                x += parent.x;
                parent = parent.parent;
            } while (parent != null);
            return x;
        }
    }, {
        key: 'absoluteY',
        get: function get() {
            var parent = this;
            var y = this.y;
            do {
                y += parent.y;
                parent = parent.parent;
            } while (parent != null);
            return y;
        }
    }, {
        key: 'children',
        get: function get() {
            return Object.values(this.controls);
        }
    }, {
        key: 'width',
        set: function set(value) {
            return this.bounds.size.width = value;
        },
        get: function get() {
            return this.bounds.size.width;
        }
    }, {
        key: 'height',
        set: function set(value) {
            return this.bounds.size.height = value;
        },
        get: function get() {
            return this.bounds.size.height;
        }
    }, {
        key: 'x',
        get: function get() {
            return this.bounds.position.x;
        },
        set: function set(value) {
            return this.bounds.position.x = value;
        }
    }, {
        key: 'y',
        get: function get() {
            return this.bounds.position.y;
        },
        set: function set(value) {
            return this.bounds.position.y = value;
        }
    }, {
        key: 'left',
        set: function set(value) {
            return this.bounds.position.x = value;
        },
        get: function get() {
            return this.x;
        }
    }, {
        key: 'top',
        set: function set(value) {
            return this.bounds.position.y = value;
        },
        get: function get() {
            return this.y;
        }
    }, {
        key: 'right',
        get: function get() {
            return this.x + this.width;
        }
    }, {
        key: 'bottom',
        get: function get() {
            return this.y + this.height;
        }
    }, {
        key: 'position',
        get: function get() {
            return this.bounds.position;
        }
    }, {
        key: 'size',
        get: function get() {
            return this.bounds.size;
        }
    }]);

    return Control;
}(_events2.default);

exports.default = Control;