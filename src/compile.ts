'use strict'

const fs = require('fs')
const peg = require('pegjs')
const uglify = require('uglify-js')

let index = fs.readFileSync(__dirname + '/index.js', 'utf8')
let parser = peg.buildParser(fs.readFileSync(__dirname + '/grammer.pegjs', 'utf8'), {
	trackLineAndColumn: true, output: 'source'
	, format: 'es',
});

let result = '// This file is automatically generated from the contents of `/src` using `/src/compile.js`\n\n' + `import {
	Token,
	Quantified,
	Quantifier,
	CaptureGroup,
	CharacterRange,
	CharSet,
	ControlCharacter,
	BackReference,
	Match,
	Octal,
	Unicode,
	Alternate,
	Literal,
	Group,
	Hex,
	types,
} from './lib';

` + 'let parser = ' + parser + `;

export const parse = parser.parse;
export default parse;
`;

fs.writeFileSync(__dirname + '/../grammer.ts', result, 'utf8');