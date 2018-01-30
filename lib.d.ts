export declare function _resetCache(): void;
export declare function parse(str: RegExp): Match;
export declare function parse(str: string): Match;
export declare namespace types {
    const CONTROL_CHARACTER = "control-character";
    const BACK_REFERENCE = "back-reference";
    const ALTERNATE = "alternate";
    const MATCH = "match";
    const CAPTURE_GROUP = "capture-group";
    const QUANTIFIED = "quantified";
    const QUANTIFIER = "quantifier";
    const CHARSET = "charset";
    const RANGE = "range";
    const LITERAL = "literal";
    const UNICODE = "unicode";
    const HEX = "hex";
    const OCTAL = "octal";
    const NEGATIVE_LOOKAHEAD = "negative-lookahead";
    const POSITIVE_LOOKAHEAD = "positive-lookahead";
    const NON_CAPTURE_GROUP = "non-capture-group";
}
export declare class Token {
    type: string;
    offset: number;
    text: string;
    constructor(type: string, obj?: any);
    toString(): string;
}
export declare namespace Token {
    let offset: () => number;
    let text: () => string;
}
export declare class Alternate extends Token {
    left: Token;
    right: Token;
    constructor(left: Token, right: Token);
}
export declare class Match extends Token {
    body: Token[];
    constructor(body: any);
}
export declare class Group extends Token {
    body: Token[];
    constructor(type: any, body?: any);
    toString(): string;
}
export declare class CaptureGroup extends Group {
    index: number;
    constructor(body: any);
}
export declare class Quantified extends Token {
    body: Token;
    quantifier: Quantifier;
    constructor(body: any, quantifier: Quantifier);
}
export declare class Quantifier extends Token {
    min: number;
    max: number;
    greedy: boolean;
    constructor(min: number, max: number);
}
export declare class CharSet extends Token {
    invert: any;
    body: (Literal | CharacterRange)[];
    constructor(invert: any, body: any);
}
export declare class CharacterRange extends Token {
    start: Literal;
    end: Literal;
    constructor(start: Literal, end: Literal);
}
export declare class Literal extends Token {
    body: string;
    escaped: boolean;
    constructor(body: string);
}
export declare class TokenChar extends Token {
    code: string;
    constructor(type: string, code: string);
}
export declare class Unicode extends TokenChar {
    constructor(code: string);
}
export declare class Hex extends TokenChar {
    constructor(code: string);
}
export declare class Octal extends TokenChar {
    constructor(code: string);
}
export declare class BackReference extends TokenChar {
    constructor(code: string);
}
export declare class ControlCharacter extends TokenChar {
    constructor(code: string);
}
import * as self from './lib';
export default self;
