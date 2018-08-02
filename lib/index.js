"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Desktop = require("./controls/Desktop");

var _Desktop2 = _interopRequireDefault(_Desktop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Yoghurt = function () {
    function Yoghurt(graphics, theme, style) {
        _classCallCheck(this, Yoghurt);

        this.graphics = graphics;
        this._theme = theme;
        this._style = style;
        this.desktop = new _Desktop2.default(this);
        this.desktop.width = graphics.bounds.width;
        this.desktop.height = graphics.bounds.height;
    }

    _createClass(Yoghurt, [{
        key: "load",
        value: function load() {
            this.desktop.load();
        }
    }, {
        key: "pack",
        value: function pack() {
            this.desktop.pack();
        }
    }, {
        key: "click",
        value: function click(x, y, button) {
            this.desktop.click(x, y, button);
        }
    }, {
        key: "mouseDown",
        value: function mouseDown(x, y, button) {
            this.desktop.mouseDown(x, y, button);
        }
    }, {
        key: "mouseUp",
        value: function mouseUp(x, y, button) {
            this.desktop.mouseUp(x, y, button);
        }
    }, {
        key: "hover",
        value: function hover(x, y, button) {
            this.desktop.hover(x, y, button);
        }
    }, {
        key: "resize",
        value: function resize() {
            this.pack();
            this.desktop.width = this.graphics.bounds.width;
            this.desktop.height = this.graphics.bounds.height;
            this.desktop.resize();
        }
    }, {
        key: "render",
        value: function render() {
            this.desktop.render(this.graphics);
        }
    }]);

    return Yoghurt;
}();

exports.default = Yoghurt;