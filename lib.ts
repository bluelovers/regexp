/**
 * Created by user on 2018/1/30/030.
 */

import { parse as parser } from './grammer';

let index = 1;
let cgs = {};

export function _resetCache()
{
	index = 1;
	cgs = {};
}

export function parse(str: RegExp): Match
export function parse(str: string): Match
export function parse(str: string | RegExp): Match
{
	if (str instanceof RegExp)
	{
		str = str.source;
	}
	if (typeof str != 'string')
	{
		let ex = new TypeError('The regexp to parse must be represented as a string.');
		throw ex;
	}
	//capture group index
	_resetCache();
	return parser(str);
}

export namespace types
{
	export const CONTROL_CHARACTER = 'control-character';
	export const BACK_REFERENCE = 'back-reference';
	export const ALTERNATE = 'alternate';
	export const MATCH = 'match';
	export const CAPTURE_GROUP = 'capture-group';
	export const QUANTIFIED = 'quantified';
	export const QUANTIFIER = 'quantifier';
	export const CHARSET = 'charset';
	export const RANGE = 'range';
	export const CHARSET_RANGE = RANGE;
	export const LITERAL = 'literal';

	export const UNICODE = 'unicode';
	export const HEX = 'hex';
	export const OCTAL = 'octal';

	export const NEGATIVE_LOOKAHEAD = 'negative-lookahead';
	export const POSITIVE_LOOKAHEAD = 'positive-lookahead';
	export const NON_CAPTURE_GROUP = 'non-capture-group';

}

export class Token
{
	public type: string;
	public offset: number;
	public text: string;

	constructor(type: string, obj?)
	{
		this.type = type;
		this.offset = Token.offset();
		this.text = Token.text();
	}

	toString(update?: boolean)
	{
		return this.text;
	}
}

export namespace Token
{
	export let offset: () => number;
	export let text: () => string;
}

export class Alternate extends Token
{
	public left: Token;
	public right: Token;

	constructor(left: Token, right: Token)
	{
		super(types.ALTERNATE);

		this.left = left;
		this.right = right;
	}
}

export class Match extends Token
{
	public body: Token[];

	constructor(body)
	{
		super(types.MATCH);

		this.body = body.filter(Boolean);
	}
}

export class Group extends Token
{
	public body: Token[];

	constructor(type, body?)
	{
		super(type);

		this.body = body;
	}

	toString(update?: boolean)
	{
		switch (this.type)
		{
			case types.NON_CAPTURE_GROUP:
				return '(' + this.text + ')';
			case types.POSITIVE_LOOKAHEAD:
				return '(?=' + this.text + ')';
			case types.NEGATIVE_LOOKAHEAD:
				return '(?!' + this.text + ')';
			case types.CAPTURE_GROUP:
				return '(' + this.text + ')';
		}

		return super.toString(update);
	}
}

export class CaptureGroup extends Group
{
	public index: number;

	constructor(body)
	{
		super(types.CAPTURE_GROUP);

		this.index = cgs[this.offset] || (cgs[this.offset] = index++);
		this.body = body;
	}
}

export class Quantified extends Token
{
	public body: Token;
	public quantifier: Quantifier;

	constructor(body, quantifier: Quantifier)
	{
		super(types.QUANTIFIED);

		this.body = body;
		this.quantifier = quantifier;
	}
}

export class Quantifier extends Token
{
	public min: number;
	public max: number;
	public greedy: boolean;

	constructor(min: number, max: number)
	{
		super(types.QUANTIFIER);

		this.min = min;
		this.max = max;
		this.greedy = true; //initial setting
	}
}

export class CharSet extends Token
{
	public invert;
	public body: (Literal | CharacterRange)[];

	constructor(invert, body)
	{
		super(types.CHARSET);

		this.invert = invert;
		this.body = body;
	}

	toString(update?: boolean)
	{
		if (update)
		{
			let text = '';

			if (this.invert)
			{
				text += '^';
			}

			for (let a of this.body)
			{
				text += a.toString();
			}

			return `[${text}]`;
		}

		return super.toString(update);
	}
}

export class CharacterRange extends Token
{
	public start: Literal;
	public end: Literal;

	public body?: Literal[];

	constructor(start: Literal, end: Literal)
	{
		super(types.RANGE);

		this.start = start;
		this.end = end;
	}

	setBody(arr: Array<Literal | string>)
	{
		let body_new: Literal[] = [];

		for (let s of arr)
		{
			//console.log(s);
			if (typeof s == 'string')
			{
				body_new.push(new Literal(s, true));
			}
			else if (s instanceof Literal)
			{
				body_new.push(s);
			}
			else
			{
				throw new RangeError();
			}
		}

		if (!body_new.length)
		{
			throw new ReferenceError();
		}

		this.body = body_new;

		this.start = this.body[0];
		this.end = this.body[this.body.length - 1];

		this.text = this.toString(true);

		return this;
	}

	toString(update?: boolean)
	{
		if (update && this.body)
		{
			let text = '';

			for (let a of this.body)
			{
				text += a.toString();
			}

			return text;
		}

		return super.toString(update);
	}

	inspect()
	{
		return `CharacterRange(${this.start}-${this.end})`;
	}
}

export class Literal extends Token
{
	public body: string;

	constructor(body: string, text: string | true = null)
	{
		super(types.LITERAL);

		if (typeof text == 'string' || text === true)
		{
			this.text = typeof text == 'string' ? text : body;
		}

		this.body = body;
	}

	get escaped(): boolean
	{
		return this.body != this.text;
	}

	inspect()
	{
		return `Literal(${this.text})`;
	}
}

export class TokenChar extends Token
{
	public code: string;

	constructor(type: string, code: string)
	{
		super(type);

		this.code = code.toUpperCase();
	}
}

export class Unicode extends TokenChar
{
	constructor(code: string)
	{
		super(types.UNICODE, code);
	}
}

export class Hex extends TokenChar
{
	constructor(code: string)
	{
		super(types.HEX, code);
	}
}

export class Octal extends TokenChar
{
	constructor(code: string)
	{
		super(types.OCTAL, code);
	}
}

export class BackReference extends TokenChar
{
	constructor(code: string)
	{
		super(types.BACK_REFERENCE, code);
	}
}

export class ControlCharacter extends TokenChar
{
	constructor(code: string)
	{
		super(types.CONTROL_CHARACTER, code);
	}
}

export default exports as typeof import('./lib');
