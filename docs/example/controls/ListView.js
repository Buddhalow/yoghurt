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

/**
 * Work in progress
 */
var ListView = function (_Control) {
    _inherits(ListView, _Control);

    function ListView(parent, id) {
        _classCallCheck(this, ListView);

        var _this = _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, parent, id));

        _this.listViewStyle = 'details';
        _this.items = [];
        _this.columnheaders = {};
        _this.selectedItems = [];
        _this.scroll = {
            x: 0,
            y: 0
        };
        _this.backgroundColor = 'white';
        return _this;
    }

    _createClass(ListView, [{
        key: 'renderColumnHeaders',
        value: function renderColumnHeaders() {
            var left = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.columnheaders)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var columnheaderId = _step.value;

                    var columnheader = this.columnheaders[columnheaderId];
                    var button = {
                        x: left,
                        top: 0,
                        width: columnheader.width,
                        height: 18,
                        text: columnheader.text
                    };
                    this.style.drawButton(gc, button);
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
        key: 'render',
        value: function render(gc) {
            _get(ListView.prototype.__proto__ || Object.getPrototypeOf(ListView.prototype), 'render', this).call(this, gc);
            if (this.listViewStyle === 'details') {
                this.renderColumnHeaders();
                gc.clip(0, this.top + 18, this.width, this.height - this.top + 28);
                gc.translate(this.scroll.x, this.scroll.y);
                var top = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        if (this.selectedItems.indexOf(item)) {
                            gc.setFillStyle(this.style.highlight);
                            gc.fillRectangle(0, top, this.width, 18);
                            gc.setFillStyle(this.style.highlightText);
                        } else {
                            gc.setFillStyle('black');
                        }
                        var left = 0;
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = Object.keys(this.columnheaders)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var columnheaderId = _step3.value;

                                var columnheader = this.columnheaders[columnheaderId];
                                var width = gc.measureText(columnheader.label) + 44;
                                gc.fillText(item.label, left + 22, top + 2, width, 18);
                                left += width;
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

                        top += 18;
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

                gc.translate(-this.scroll.x, -this.scroll.y);
            }
        }
    }]);

    return ListView;
}(_Control3.default);

exports.default = ListView;