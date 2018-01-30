/**
 * Created by user on 2018/1/30/030.
 */

import localDev, { relative, expect, path, assert, util } from './_local-dev';

import { parse } from '..';
import * as expressions from './expressions';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest;

	// @ts-ignore
	beforeEach(function ()
	{
		currentTest = this.currentTest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`expressions`, () =>
	{

		expressions.forEach(function (expression)
		{
			const exp = /^\/(.*)\/$/.exec(expression[0].toString())[1];
			const parsed = parse(exp);

			// @ts-ignore
			it(`${exp}`, function (done)
			{
				expect(parsed).to.be.deep.equal(expression[1]);

				done();
			});

		});
	});
});
