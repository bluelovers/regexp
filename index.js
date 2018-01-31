"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
exports.parse = lib_1.parse;
exports.types = lib_1.types;
function isRegExp(r) {
    if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]') {
        return r;
    }
    return null;
}
exports.isRegExp = isRegExp;
exports.default = lib_1.parse;
