paywell-xml
===============

[![Build Status](https://travis-ci.org/paywell/paywell-xml.svg?branch=master)](https://travis-ci.org/paywell/paywell-xml)
[![Dependency Status](https://img.shields.io/david/paywell/paywell-xml.svg?style=flat)](https://david-dm.org/paywell/paywell-xml)
[![npm version](https://badge.fury.io/js/paywell-xml.svg)](https://badge.fury.io/js/paywell-xml)

paywell xml utilities

## Requirements
- [NodeJS 6.5.0+](https://nodejs.org/en/)

## Installation
```sh
$ npm install --save paywell-xml
```

## Usage

```javascript
const xml = require('paywell-xml');

//parse and convert xml to json
xml.parse(<xml>, function (error, json) {
 
 ...

});

//parse and convert xml to json with options
xml.parse(<xml>, {root:'payments'}, function (error, json) {
 
 ...

});

//convert json to xml
xml.build(<json>, function (error, xml) {
 
 ...

});

//convert json to xml with options
xml.build(<json>, {$:{version:'2.0'}},function (error, xml) {
 
 ...

});

```


## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence

The MIT License (MIT)

Copyright (c) 2016 byteskode, paywell, lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 