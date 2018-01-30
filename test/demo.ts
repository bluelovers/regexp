/**
 * Created by user on 2018/1/30/030.
 */

import { parse, types } from '..';

let res;

res = parse(/団+(?:b)*[覺觉](?:111)[団团團](1*|[a-z0-9]|)\n\w(a)(?!a)(?=444)/.source);
//res = parse(/ [A1-9]{2,}/.source);

//console.log(res.body, res.toString());

console.log(toRegexp(res));

/**
 * @todo pack back to RegExp
 *
 * @param res
 * @returns {string}
 */
function toRegexp(res): string
{
	if (res.body)
	{
		if (res.body.type == types.ALTERNATE)
		{
			return toRegexp(res.body.left) + '|' + toRegexp(res.body.right);
		}
		else if (res.type == types.MATCH)
		{
			return res.body.reduce(function(a, b){
				a.push(_(b));

				return a;
			}, []).join('');
		}
		else if (res.type == types.QUANTIFIED)
		{
			return _(res.body) + toRegexp(res.quantifier);
		}

		return _(res.body);
	}

	return res.text;
}

function _(b)
{
	switch (b.type)
	{
		case types.CHARSET:
			return b.text;
		case types.POSITIVE_LOOKAHEAD:
			return '(?=' + toRegexp(b) + ')';
		case types.NEGATIVE_LOOKAHEAD:
			return '(?!' + toRegexp(b) + ')';
		case types.CAPTURE_GROUP:
			//console.log(b.body, b.type, b.body.type);
			return '(' + toRegexp(b) + ')';
		case types.MATCH:
			return toRegexp(b);
		case types.QUANTIFIED:
			console.log(888, b, b.type);
			return _(b.body) + toRegexp(b.quantifier);
		case types.LITERAL:
			return `[${b.text}777]`;
		default:
			console.log(999, b, b.type);

			break;
	}

	return b.toString();
}
