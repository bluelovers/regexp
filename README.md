# regexp

> Regex Parser (fork from regexp)

Regex parser based on descriptions in http://www.javascriptkit.com/javatutors/redev2.shtml

## Installation

    npm install regexp2

## Usage

- other [demo](test/demo.ts)

```ts
var regexp = require('regexp2').parse;
var res = regexp('[a-z]+');

import regexp from 'regexp2';
var res = regexp(/[a-z]+/);

import { parse } from 'regexp2';
const regexp = parse;
var res = regexp(/[a-z]+/);
```

```ts
assert.deepEqual(res, { type: 'match',
  offset: 0,
  text: '[a-z]+',
  body:
   [ { type: 'quantified',
       offset: 0,
       text: '[a-z]+',
       body:
        { type: 'charset',
          offset: 0,
          text: '[a-z]',
          invert: false,
          body:
           [ { type: 'range',
               offset: 1,
               text: 'a-z',
               start: 'a',
               end: 'z' } ] },
       quantifier:
        { type: 'quantifier',
          offset: 5,
          text: '+',
          min: 1,
          max: Infinity,
          greedy: true } } ] })
```

## Contributing

To run tests:

```console
$ npm install
$ npm test
```

This will also automatically compile `index.js`.

The key source files are `src/grammer.pegjs` which is compiled using [pegjs](http://pegjs.majda.cz/) and `src/index.js` which is a CommonJS module with a special additional pseudo `import` statement.

## License

  MIT
