/**
 * Created by user on 2018/1/30/030.
 */

import { parse, types } from './lib';

export { parse, types };

export function isRegExp(r: RegExp): RegExp
export function isRegExp(r): RegExp | null
export function isRegExp(r)
{
	if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]')
	{
		return r;
	}

	return null;
}

export default parse;
