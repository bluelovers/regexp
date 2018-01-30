"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
let parser = (function () {
    function peg$subclass(child, parent) {
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
    }
    function SyntaxError(expected, found, offset, line, column) {
        function buildMessage(expected, found) {
            function stringEscape(s) {
                function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }
                return s
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"')
                    .replace(/\x08/g, '\\b')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n')
                    .replace(/\f/g, '\\f')
                    .replace(/\r/g, '\\r')
                    .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
                    .replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) { return '\\x' + hex(ch); })
                    .replace(/[\u0180-\u0FFF]/g, function (ch) { return '\\u0' + hex(ch); })
                    .replace(/[\u1080-\uFFFF]/g, function (ch) { return '\\u' + hex(ch); });
            }
            var expectedDesc, foundDesc;
            switch (expected.length) {
                case 0:
                    expectedDesc = "end of input";
                    break;
                case 1:
                    expectedDesc = expected[0];
                    break;
                default:
                    expectedDesc = expected.slice(0, -1).join(", ")
                        + " or "
                        + expected[expected.length - 1];
            }
            foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }
        this.expected = expected;
        this.found = found;
        this.offset = offset;
        this.line = line;
        this.column = column;
        this.name = "SyntaxError";
        this.message = buildMessage(expected, found);
    }
    peg$subclass(SyntaxError, Error);
    function parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {}, peg$startRuleFunctions = { regexp: peg$parseregexp }, peg$startRuleFunction = peg$parseregexp, peg$c0 = null, peg$c1 = "", peg$c2 = "|", peg$c3 = "\"|\"", peg$c4 = function (match, alternate) { return alternate ? new lib_1.Alternate(match, alternate[1]) : match; }, peg$c5 = [], peg$c6 = function (start, match, end) { return new lib_1.Match([start].concat(match).concat([end])); }, peg$c7 = "^", peg$c8 = "\"^\"", peg$c9 = function () { return new lib_1.Token('start'); }, peg$c10 = "$", peg$c11 = "\"$\"", peg$c12 = function () { return new lib_1.Token('end'); }, peg$c13 = function (submatch, quantifier) { return new lib_1.Quantified(submatch, quantifier); }, peg$c14 = "Quantifier", peg$c15 = function (quantity, notgreedy) { if (notgreedy) {
            quantity.greedy = false;
        } return quantity; }, peg$c16 = "{", peg$c17 = "\"{\"", peg$c18 = ",", peg$c19 = "\",\"", peg$c20 = "}", peg$c21 = "\"}\"", peg$c22 = function (min, max) { return new lib_1.Quantifier(min, max); }, peg$c23 = ",}", peg$c24 = "\",}\"", peg$c25 = function (min) { return new lib_1.Quantifier(min, Infinity); }, peg$c26 = function (value) { return new lib_1.Quantifier(value, value); }, peg$c27 = "+", peg$c28 = "\"+\"", peg$c29 = function () { return new lib_1.Quantifier(1, Infinity); }, peg$c30 = "*", peg$c31 = "\"*\"", peg$c32 = function () { return new lib_1.Quantifier(0, Infinity); }, peg$c33 = "?", peg$c34 = "\"?\"", peg$c35 = function () { return new lib_1.Quantifier(0, 1); }, peg$c36 = /^[0-9]/, peg$c37 = "[0-9]", peg$c38 = function (num) { return +num.join(''); }, peg$c39 = "(", peg$c40 = "\"(\"", peg$c41 = ")", peg$c42 = "\")\"", peg$c43 = function (body) { return body; }, peg$c44 = function (regexp) { return new lib_1.CaptureGroup(regexp); }, peg$c45 = "?:", peg$c46 = "\"?:\"", peg$c47 = function (regexp) { return new lib_1.Group('non-capture-group', regexp); }, peg$c48 = "?=", peg$c49 = "\"?=\"", peg$c50 = function (regexp) { return new lib_1.Group('positive-lookahead', regexp); }, peg$c51 = "?!", peg$c52 = "\"?!\"", peg$c53 = function (regexp) { return new lib_1.Group('negative-lookahead', regexp); }, peg$c54 = "CharacterSet", peg$c55 = "[", peg$c56 = "\"[\"", peg$c57 = "]", peg$c58 = "\"]\"", peg$c59 = function (invert, body) { return new lib_1.CharSet(!!invert, body); }, peg$c60 = "CharacterRange", peg$c61 = "-", peg$c62 = "\"-\"", peg$c63 = function (start, end) { return new lib_1.CharacterRange(start, end); }, peg$c64 = "Character", peg$c65 = /^[^\\\]]/, peg$c66 = "[^\\\\\\]]", peg$c67 = function (value) { return new lib_1.Literal(value); }, peg$c68 = ".", peg$c69 = "\".\"", peg$c70 = function () { return new lib_1.Token('any-character'); }, peg$c71 = "Literal", peg$c72 = /^[^|\\\/.[()?+*$\^]/, peg$c73 = "[^|\\\\\\/.[()?+*$\\^]", peg$c74 = "\\b", peg$c75 = "\"\\\\b\"", peg$c76 = function () { return new lib_1.Token('backspace'); }, peg$c77 = function () { return new lib_1.Token('word-boundary'); }, peg$c78 = "\\B", peg$c79 = "\"\\\\B\"", peg$c80 = function () { return new lib_1.Token('non-word-boundary'); }, peg$c81 = "\\d", peg$c82 = "\"\\\\d\"", peg$c83 = function () { return new lib_1.Token('digit'); }, peg$c84 = "\\D", peg$c85 = "\"\\\\D\"", peg$c86 = function () { return new lib_1.Token('non-digit'); }, peg$c87 = "\\f", peg$c88 = "\"\\\\f\"", peg$c89 = function () { return new lib_1.Token('form-feed'); }, peg$c90 = "\\n", peg$c91 = "\"\\\\n\"", peg$c92 = function () { return new lib_1.Token('line-feed'); }, peg$c93 = "\\r", peg$c94 = "\"\\\\r\"", peg$c95 = function () { return new lib_1.Token('carriage-return'); }, peg$c96 = "\\s", peg$c97 = "\"\\\\s\"", peg$c98 = function () { return new lib_1.Token('white-space'); }, peg$c99 = "\\S", peg$c100 = "\"\\\\S\"", peg$c101 = function () { return new lib_1.Token('non-white-space'); }, peg$c102 = "\\t", peg$c103 = "\"\\\\t\"", peg$c104 = function () { return new lib_1.Token('tab'); }, peg$c105 = "\\v", peg$c106 = "\"\\\\v\"", peg$c107 = function () { return new lib_1.Token('vertical-tab'); }, peg$c108 = "\\w", peg$c109 = "\"\\\\w\"", peg$c110 = function () { return new lib_1.Token('word'); }, peg$c111 = "\\W", peg$c112 = "\"\\\\W\"", peg$c113 = function () { return new lib_1.Token('non-word'); }, peg$c114 = "\\c", peg$c115 = "\"\\\\c\"", peg$c116 = "any character", peg$c117 = function (code) { return new lib_1.ControlCharacter(code); }, peg$c118 = "\\", peg$c119 = "\"\\\\\"", peg$c120 = /^[1-9]/, peg$c121 = "[1-9]", peg$c122 = function (code) { return new lib_1.BackReference(code); }, peg$c123 = "\\0", peg$c124 = "\"\\\\0\"", peg$c125 = /^[0-7]/, peg$c126 = "[0-7]", peg$c127 = function (code) { return new lib_1.Octal(code.join('')); }, peg$c128 = "\\x", peg$c129 = "\"\\\\x\"", peg$c130 = /^[0-9a-fA-F]/, peg$c131 = "[0-9a-fA-F]", peg$c132 = function (code) { return new lib_1.Hex(code.join('')); }, peg$c133 = "\\u", peg$c134 = "\"\\\\u\"", peg$c135 = function (code) { return new lib_1.Unicode(code.join('')); }, peg$c136 = function () { return new lib_1.Token('null-character'); }, peg$currPos = 0, peg$reportedPos = 0, peg$cachedPos = 0, peg$cachedPosDetails = { line: 1, column: 1, seenCR: false }, peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
        if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) {
                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
            }
            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function text() {
            return input.substring(peg$reportedPos, peg$currPos);
        }
        function offset() {
            return peg$reportedPos;
        }
        function line() {
            return peg$computePosDetails(peg$reportedPos).line;
        }
        function column() {
            return peg$computePosDetails(peg$reportedPos).column;
        }
        function peg$computePosDetails(pos) {
            function advance(details, startPos, endPos) {
                var p, ch;
                for (p = startPos; p < endPos; p++) {
                    ch = input.charAt(p);
                    if (ch === "\n") {
                        if (!details.seenCR) {
                            details.line++;
                        }
                        details.column = 1;
                        details.seenCR = false;
                    }
                    else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                        details.line++;
                        details.column = 1;
                        details.seenCR = true;
                    }
                    else {
                        details.column++;
                        details.seenCR = false;
                    }
                }
            }
            if (peg$cachedPos !== pos) {
                if (peg$cachedPos > pos) {
                    peg$cachedPos = 0;
                    peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
                }
                advance(peg$cachedPosDetails, peg$cachedPos, pos);
                peg$cachedPos = pos;
            }
            return peg$cachedPosDetails;
        }
        function peg$fail(expected) {
            if (peg$currPos < peg$maxFailPos) {
                return;
            }
            if (peg$currPos > peg$maxFailPos) {
                peg$maxFailPos = peg$currPos;
                peg$maxFailExpected = [];
            }
            peg$maxFailExpected.push(expected);
        }
        function peg$cleanupExpected(expected) {
            var i = 0;
            expected.sort();
            while (i < expected.length) {
                if (expected[i - 1] === expected[i]) {
                    expected.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        function peg$parseregexp() {
            var s0, s1, s2, s3, s4;
            s0 = peg$currPos;
            s1 = peg$parsematch();
            if (s1 !== null) {
                s2 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 124) {
                    s3 = peg$c2;
                    peg$currPos++;
                }
                else {
                    s3 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c3);
                    }
                }
                if (s3 !== null) {
                    s4 = peg$parseregexp();
                    if (s4 !== null) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                }
                if (s2 === null) {
                    s2 = peg$c1;
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c4(s1, s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsematch() {
            var s0, s1, s2, s3, s4;
            s0 = peg$currPos;
            s1 = peg$parsestart();
            if (s1 === null) {
                s1 = peg$c1;
            }
            if (s1 !== null) {
                s2 = peg$currPos;
                peg$silentFails++;
                s3 = peg$parsequantifier();
                peg$silentFails--;
                if (s3 === null) {
                    s2 = peg$c1;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                }
                if (s2 !== null) {
                    s3 = [];
                    s4 = peg$parsequantified();
                    if (s4 === null) {
                        s4 = peg$parsesubmatch();
                    }
                    while (s4 !== null) {
                        s3.push(s4);
                        s4 = peg$parsequantified();
                        if (s4 === null) {
                            s4 = peg$parsesubmatch();
                        }
                    }
                    if (s3 !== null) {
                        s4 = peg$parseend();
                        if (s4 === null) {
                            s4 = peg$c1;
                        }
                        if (s4 !== null) {
                            peg$reportedPos = s0;
                            s1 = peg$c6(s1, s3, s4);
                            if (s1 === null) {
                                peg$currPos = s0;
                                s0 = s1;
                            }
                            else {
                                s0 = s1;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsesubmatch() {
            var s0;
            s0 = peg$parsesubexp();
            if (s0 === null) {
                s0 = peg$parsecharset();
                if (s0 === null) {
                    s0 = peg$parseterminal();
                }
            }
            return s0;
        }
        function peg$parsestart() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 94) {
                s1 = peg$c7;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c9();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseend() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 36) {
                s1 = peg$c10;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c12();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsequantified() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = peg$parsesubmatch();
            if (s1 !== null) {
                s2 = peg$parsequantifier();
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c13(s1, s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsequantifier() {
            var s0, s1, s2;
            peg$silentFails++;
            s0 = peg$currPos;
            s1 = peg$parsequantifierSpec();
            if (s1 !== null) {
                s2 = peg$parsegreedyFlag();
                if (s2 === null) {
                    s2 = peg$c1;
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c15(s1, s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            peg$silentFails--;
            if (s0 === null) {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c14);
                }
            }
            return s0;
        }
        function peg$parsequantifierSpec() {
            var s0;
            s0 = peg$parsequantifierSpecFull();
            if (s0 === null) {
                s0 = peg$parsequantifierSpecAtLeast();
                if (s0 === null) {
                    s0 = peg$parsequantifierSpecExact();
                    if (s0 === null) {
                        s0 = peg$parsequantifierRequired();
                        if (s0 === null) {
                            s0 = peg$parsequantifierAny();
                            if (s0 === null) {
                                s0 = peg$parsequantifierOptional();
                            }
                        }
                    }
                }
            }
            return s0;
        }
        function peg$parsequantifierSpecFull() {
            var s0, s1, s2, s3, s4, s5;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c16;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseinteger();
                if (s2 !== null) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s3 = peg$c18;
                        peg$currPos++;
                    }
                    else {
                        s3 = null;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c19);
                        }
                    }
                    if (s3 !== null) {
                        s4 = peg$parseinteger();
                        if (s4 !== null) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s5 = peg$c20;
                                peg$currPos++;
                            }
                            else {
                                s5 = null;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c21);
                                }
                            }
                            if (s5 !== null) {
                                peg$reportedPos = s0;
                                s1 = peg$c22(s2, s4);
                                if (s1 === null) {
                                    peg$currPos = s0;
                                    s0 = s1;
                                }
                                else {
                                    s0 = s1;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$c0;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsequantifierSpecAtLeast() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c16;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseinteger();
                if (s2 !== null) {
                    if (input.substr(peg$currPos, 2) === peg$c23) {
                        s3 = peg$c23;
                        peg$currPos += 2;
                    }
                    else {
                        s3 = null;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c24);
                        }
                    }
                    if (s3 !== null) {
                        peg$reportedPos = s0;
                        s1 = peg$c25(s2);
                        if (s1 === null) {
                            peg$currPos = s0;
                            s0 = s1;
                        }
                        else {
                            s0 = s1;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsequantifierSpecExact() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c16;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseinteger();
                if (s2 !== null) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                        s3 = peg$c20;
                        peg$currPos++;
                    }
                    else {
                        s3 = null;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c21);
                        }
                    }
                    if (s3 !== null) {
                        peg$reportedPos = s0;
                        s1 = peg$c26(s2);
                        if (s1 === null) {
                            peg$currPos = s0;
                            s0 = s1;
                        }
                        else {
                            s0 = s1;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsequantifierRequired() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 43) {
                s1 = peg$c27;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c28);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c29();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsequantifierAny() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c30;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c32();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsequantifierOptional() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 63) {
                s1 = peg$c33;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c34);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c35();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsegreedyFlag() {
            var s0;
            if (input.charCodeAt(peg$currPos) === 63) {
                s0 = peg$c33;
                peg$currPos++;
            }
            else {
                s0 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c34);
                }
            }
            return s0;
        }
        function peg$parseinteger() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = [];
            if (peg$c36.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c37);
                }
            }
            if (s2 !== null) {
                while (s2 !== null) {
                    s1.push(s2);
                    if (peg$c36.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s2 = null;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c37);
                        }
                    }
                }
            }
            else {
                s1 = peg$c0;
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c38(s1);
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsesubexp() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 40) {
                s1 = peg$c39;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c40);
                }
            }
            if (s1 !== null) {
                s2 = peg$parsepositiveLookahead();
                if (s2 === null) {
                    s2 = peg$parsenegativeLookahead();
                    if (s2 === null) {
                        s2 = peg$parsegroupNoCapture();
                        if (s2 === null) {
                            s2 = peg$parsegroupCapture();
                        }
                    }
                }
                if (s2 !== null) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                        s3 = peg$c41;
                        peg$currPos++;
                    }
                    else {
                        s3 = null;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c42);
                        }
                    }
                    if (s3 !== null) {
                        peg$reportedPos = s0;
                        s1 = peg$c43(s2);
                        if (s1 === null) {
                            peg$currPos = s0;
                            s0 = s1;
                        }
                        else {
                            s0 = s1;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsegroupCapture() {
            var s0, s1;
            s0 = peg$currPos;
            s1 = peg$parseregexp();
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c44(s1);
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsegroupNoCapture() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c45) {
                s1 = peg$c45;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c46);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseregexp();
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c47(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsepositiveLookahead() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c48) {
                s1 = peg$c48;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c49);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseregexp();
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c50(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsenegativeLookahead() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c51) {
                s1 = peg$c51;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c52);
                }
            }
            if (s1 !== null) {
                s2 = peg$parseregexp();
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c53(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsecharset() {
            var s0, s1, s2, s3, s4;
            peg$silentFails++;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c55;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c56);
                }
            }
            if (s1 !== null) {
                if (input.charCodeAt(peg$currPos) === 94) {
                    s2 = peg$c7;
                    peg$currPos++;
                }
                else {
                    s2 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c8);
                    }
                }
                if (s2 === null) {
                    s2 = peg$c1;
                }
                if (s2 !== null) {
                    s3 = [];
                    s4 = peg$parsecharsetRange();
                    if (s4 === null) {
                        s4 = peg$parsecharsetTerminal();
                    }
                    while (s4 !== null) {
                        s3.push(s4);
                        s4 = peg$parsecharsetRange();
                        if (s4 === null) {
                            s4 = peg$parsecharsetTerminal();
                        }
                    }
                    if (s3 !== null) {
                        if (input.charCodeAt(peg$currPos) === 93) {
                            s4 = peg$c57;
                            peg$currPos++;
                        }
                        else {
                            s4 = null;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c58);
                            }
                        }
                        if (s4 !== null) {
                            peg$reportedPos = s0;
                            s1 = peg$c59(s2, s3);
                            if (s1 === null) {
                                peg$currPos = s0;
                                s0 = s1;
                            }
                            else {
                                s0 = s1;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            peg$silentFails--;
            if (s0 === null) {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c54);
                }
            }
            return s0;
        }
        function peg$parsecharsetRange() {
            var s0, s1, s2, s3;
            peg$silentFails++;
            s0 = peg$currPos;
            s1 = peg$parsecharsetTerminal();
            if (s1 !== null) {
                if (input.charCodeAt(peg$currPos) === 45) {
                    s2 = peg$c61;
                    peg$currPos++;
                }
                else {
                    s2 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c62);
                    }
                }
                if (s2 !== null) {
                    s3 = peg$parsecharsetTerminal();
                    if (s3 !== null) {
                        peg$reportedPos = s0;
                        s1 = peg$c63(s1, s3);
                        if (s1 === null) {
                            peg$currPos = s0;
                            s0 = s1;
                        }
                        else {
                            s0 = s1;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            peg$silentFails--;
            if (s0 === null) {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                }
            }
            return s0;
        }
        function peg$parsecharsetTerminal() {
            var s0, s1;
            peg$silentFails++;
            s0 = peg$parsecharsetEscapedCharacter();
            if (s0 === null) {
                s0 = peg$parsecharsetLiteral();
            }
            peg$silentFails--;
            if (s0 === null) {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c64);
                }
            }
            return s0;
        }
        function peg$parsecharsetLiteral() {
            var s0, s1;
            s0 = peg$currPos;
            if (peg$c65.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c66);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c67(s1);
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsecharsetEscapedCharacter() {
            var s0;
            s0 = peg$parsebackspaceCharacter();
            if (s0 === null) {
                s0 = peg$parsecontrolCharacter();
                if (s0 === null) {
                    s0 = peg$parsedigitCharacter();
                    if (s0 === null) {
                        s0 = peg$parsenon_digitCharacter();
                        if (s0 === null) {
                            s0 = peg$parseformFeedCharacter();
                            if (s0 === null) {
                                s0 = peg$parselineFeedCharacter();
                                if (s0 === null) {
                                    s0 = peg$parsecarriageReturnCharacter();
                                    if (s0 === null) {
                                        s0 = peg$parsewhiteSpaceCharacter();
                                        if (s0 === null) {
                                            s0 = peg$parsenonWhiteSpaceCharacter();
                                            if (s0 === null) {
                                                s0 = peg$parsetabCharacter();
                                                if (s0 === null) {
                                                    s0 = peg$parseverticalTabCharacter();
                                                    if (s0 === null) {
                                                        s0 = peg$parsewordCharacter();
                                                        if (s0 === null) {
                                                            s0 = peg$parsenonWordCharacter();
                                                            if (s0 === null) {
                                                                s0 = peg$parseoctalCharacter();
                                                                if (s0 === null) {
                                                                    s0 = peg$parsehexCharacter();
                                                                    if (s0 === null) {
                                                                        s0 = peg$parseunicodeCharacter();
                                                                        if (s0 === null) {
                                                                            s0 = peg$parsenullCharacter();
                                                                            if (s0 === null) {
                                                                                s0 = peg$parseotherEscaped();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return s0;
        }
        function peg$parseterminal() {
            var s0;
            s0 = peg$parseanyCharacter();
            if (s0 === null) {
                s0 = peg$parseescapedCharacter();
                if (s0 === null) {
                    s0 = peg$parseliteral();
                }
            }
            return s0;
        }
        function peg$parseanyCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
                s1 = peg$c68;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c69);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c70();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseliteral() {
            var s0, s1;
            peg$silentFails++;
            s0 = peg$currPos;
            if (peg$c72.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c73);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c67(s1);
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            peg$silentFails--;
            if (s0 === null) {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c71);
                }
            }
            return s0;
        }
        function peg$parseescapedCharacter() {
            var s0;
            s0 = peg$parseword_boundaryCharacter();
            if (s0 === null) {
                s0 = peg$parsenonWord_boundaryCharacter();
                if (s0 === null) {
                    s0 = peg$parsecontrolCharacter();
                    if (s0 === null) {
                        s0 = peg$parsedigitCharacter();
                        if (s0 === null) {
                            s0 = peg$parsenon_digitCharacter();
                            if (s0 === null) {
                                s0 = peg$parseformFeedCharacter();
                                if (s0 === null) {
                                    s0 = peg$parselineFeedCharacter();
                                    if (s0 === null) {
                                        s0 = peg$parsecarriageReturnCharacter();
                                        if (s0 === null) {
                                            s0 = peg$parsewhiteSpaceCharacter();
                                            if (s0 === null) {
                                                s0 = peg$parsenonWhiteSpaceCharacter();
                                                if (s0 === null) {
                                                    s0 = peg$parsetabCharacter();
                                                    if (s0 === null) {
                                                        s0 = peg$parseverticalTabCharacter();
                                                        if (s0 === null) {
                                                            s0 = peg$parsewordCharacter();
                                                            if (s0 === null) {
                                                                s0 = peg$parsenonWordCharacter();
                                                                if (s0 === null) {
                                                                    s0 = peg$parsebackReference();
                                                                    if (s0 === null) {
                                                                        s0 = peg$parseoctalCharacter();
                                                                        if (s0 === null) {
                                                                            s0 = peg$parsehexCharacter();
                                                                            if (s0 === null) {
                                                                                s0 = peg$parseunicodeCharacter();
                                                                                if (s0 === null) {
                                                                                    s0 = peg$parsenullCharacter();
                                                                                    if (s0 === null) {
                                                                                        s0 = peg$parseotherEscaped();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return s0;
        }
        function peg$parsebackspaceCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c74) {
                s1 = peg$c74;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c75);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c76();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseword_boundaryCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c74) {
                s1 = peg$c74;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c75);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c77();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsenonWord_boundaryCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c78) {
                s1 = peg$c78;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c79);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c80();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsedigitCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c81) {
                s1 = peg$c81;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c82);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c83();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsenon_digitCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c84) {
                s1 = peg$c84;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c85);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c86();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseformFeedCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c87) {
                s1 = peg$c87;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c88);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c89();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parselineFeedCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c90) {
                s1 = peg$c90;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c91);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c92();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsecarriageReturnCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c93) {
                s1 = peg$c93;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c94);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c95();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsewhiteSpaceCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c96) {
                s1 = peg$c96;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c97);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c98();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsenonWhiteSpaceCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c99) {
                s1 = peg$c99;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c100);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c101();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsetabCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c102) {
                s1 = peg$c102;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c103);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c104();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseverticalTabCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c105) {
                s1 = peg$c105;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c106);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c107();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsewordCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c108) {
                s1 = peg$c108;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c109);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c110();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsenonWordCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c111) {
                s1 = peg$c111;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c112);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c113();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parsecontrolCharacter() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c114) {
                s1 = peg$c114;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c115);
                }
            }
            if (s1 !== null) {
                if (input.length > peg$currPos) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c116);
                    }
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c117(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsebackReference() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 92) {
                s1 = peg$c118;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c119);
                }
            }
            if (s1 !== null) {
                if (peg$c120.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c121);
                    }
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c122(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parseoctalCharacter() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c123) {
                s1 = peg$c123;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c124);
                }
            }
            if (s1 !== null) {
                s2 = [];
                if (peg$c125.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c126);
                    }
                }
                if (s3 !== null) {
                    while (s3 !== null) {
                        s2.push(s3);
                        if (peg$c125.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = null;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c126);
                            }
                        }
                    }
                }
                else {
                    s2 = peg$c0;
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c127(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsehexCharacter() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c128) {
                s1 = peg$c128;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c129);
                }
            }
            if (s1 !== null) {
                s2 = [];
                if (peg$c130.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c131);
                    }
                }
                if (s3 !== null) {
                    while (s3 !== null) {
                        s2.push(s3);
                        if (peg$c130.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = null;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c131);
                            }
                        }
                    }
                }
                else {
                    s2 = peg$c0;
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c132(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parseunicodeCharacter() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c133) {
                s1 = peg$c133;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c134);
                }
            }
            if (s1 !== null) {
                s2 = [];
                if (peg$c130.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c131);
                    }
                }
                if (s3 !== null) {
                    while (s3 !== null) {
                        s2.push(s3);
                        if (peg$c130.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = null;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c131);
                            }
                        }
                    }
                }
                else {
                    s2 = peg$c0;
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c135(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        function peg$parsenullCharacter() {
            var s0, s1;
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c123) {
                s1 = peg$c123;
                peg$currPos += 2;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c124);
                }
            }
            if (s1 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c136();
            }
            if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
            }
            else {
                s0 = s1;
            }
            return s0;
        }
        function peg$parseotherEscaped() {
            var s0, s1, s2;
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 92) {
                s1 = peg$c118;
                peg$currPos++;
            }
            else {
                s1 = null;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c119);
                }
            }
            if (s1 !== null) {
                if (input.length > peg$currPos) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = null;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c116);
                    }
                }
                if (s2 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    if (s1 === null) {
                        peg$currPos = s0;
                        s0 = s1;
                    }
                    else {
                        s0 = s1;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$c0;
            }
            return s0;
        }
        lib_1.Token.offset = offset;
        lib_1.Token.text = text;
        peg$result = peg$startRuleFunction();
        if (peg$result !== null && peg$currPos === input.length) {
            return peg$result;
        }
        else {
            peg$cleanupExpected(peg$maxFailExpected);
            peg$reportedPos = Math.max(peg$currPos, peg$maxFailPos);
            throw new SyntaxError(peg$maxFailExpected, peg$reportedPos < input.length ? input.charAt(peg$reportedPos) : null, peg$reportedPos, peg$computePosDetails(peg$reportedPos).line, peg$computePosDetails(peg$reportedPos).column);
        }
    }
    return {
        SyntaxError: SyntaxError,
        parse: parse
    };
})();
exports.parse = parser.parse;
exports.default = exports.parse;
