"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammer_1 = require("./grammer");
let index = 1;
let cgs = {};
function parse(str) {
    if (str instanceof RegExp) {
        str = str.source;
    }
    if (typeof str != 'string') {
        let ex = new TypeError('The regexp to parse must be represented as a string.');
        throw ex;
    }
    index = 1;
    cgs = {};
    return grammer_1.default(str);
}
exports.parse = parse;
var types;
(function (types) {
    types.CONTROL_CHARACTER = 'control-character';
    types.BACK_REFERENCE = 'back-reference';
    types.ALTERNATE = 'alternate';
    types.MATCH = 'match';
    types.CAPTURE_GROUP = 'capture-group';
    types.QUANTIFIED = 'quantified';
    types.QUANTIFIER = 'quantifier';
    types.CHARSET = 'charset';
    types.RANGE = 'range';
    types.LITERAL = 'literal';
    types.UNICODE = 'unicode';
    types.HEX = 'hex';
    types.OCTAL = 'octal';
})(types = exports.types || (exports.types = {}));
class Token {
    constructor(type, obj) {
        this.type = type;
        this.offset = Token.offset();
        this.text = Token.text();
    }
    toString() {
        return this.text;
    }
}
exports.Token = Token;
(function (Token) {
})(Token = exports.Token || (exports.Token = {}));
class Alternate extends Token {
    constructor(left, right) {
        super(types.ALTERNATE);
        this.left = left;
        this.right = right;
    }
}
exports.Alternate = Alternate;
class Match extends Token {
    constructor(body) {
        super(types.MATCH);
        this.body = body.filter(Boolean);
    }
}
exports.Match = Match;
class Group extends Token {
    constructor(type, body) {
        super(type);
        this.body = body;
    }
}
exports.Group = Group;
class CaptureGroup extends Group {
    constructor(body) {
        super(types.CAPTURE_GROUP);
        this.index = cgs[this.offset] || (cgs[this.offset] = index++);
        this.body = body;
    }
}
exports.CaptureGroup = CaptureGroup;
class Quantified extends Token {
    constructor(body, quantifier) {
        super(types.QUANTIFIED);
        this.body = body;
        this.quantifier = quantifier;
    }
}
exports.Quantified = Quantified;
class Quantifier extends Token {
    constructor(min, max) {
        super(types.QUANTIFIER);
        this.min = min;
        this.max = max;
        this.greedy = true;
    }
}
exports.Quantifier = Quantifier;
class CharSet extends Token {
    constructor(invert, body) {
        super(types.CHARSET);
        this.invert = invert;
        this.body = body;
    }
}
exports.CharSet = CharSet;
class CharacterRange extends Token {
    constructor(start, end) {
        super(types.RANGE);
        this.start = start;
        this.end = end;
    }
}
exports.CharacterRange = CharacterRange;
class Literal extends Token {
    constructor(body) {
        super(types.LITERAL);
        this.body = body;
        this.escaped = this.body != this.text;
    }
}
exports.Literal = Literal;
class TokenChar extends Token {
    constructor(type, code) {
        super(type);
        this.code = code.toUpperCase();
    }
}
exports.TokenChar = TokenChar;
class Unicode extends TokenChar {
    constructor(code) {
        super(types.UNICODE, code);
    }
}
exports.Unicode = Unicode;
class Hex extends TokenChar {
    constructor(code) {
        super(types.HEX, code);
    }
}
exports.Hex = Hex;
class Octal extends TokenChar {
    constructor(code) {
        super(types.OCTAL, code);
    }
}
exports.Octal = Octal;
class BackReference extends TokenChar {
    constructor(code) {
        super(types.BACK_REFERENCE, code);
    }
}
exports.BackReference = BackReference;
class ControlCharacter extends TokenChar {
    constructor(code) {
        super(types.CONTROL_CHARACTER, code);
    }
}
exports.ControlCharacter = ControlCharacter;
const self = require("./lib");
exports.default = self;
