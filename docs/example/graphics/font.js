"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Font = function Font(name, size) {
    var bold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var italic = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Font);

    this.name = name;
    this.size = size;
    this.bold = bold;
    this.italic = italic;
};

exports.default = Font;