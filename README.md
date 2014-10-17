# node-spinner

A simple spinner for node cli.

## Installation

This package is available on [npm][3] as: `cli-spinner`

``` sh
npm install cli-spinner
```

## Usage

**Syntax:** var obj = new Spinner **(** [`title`] **)** 

Creates a new spinner object with the default options.

* obj.start([string]) - starts the spinner. (accepts printf style string input)
* obj.stop() - stops the spinner.
* obj.setSpinnerString(spinnerString) - sets the spinner string the specific instance.
* obj.setSpinnerDelay(spinnerDelay) - sets the spinner animation speed.
* Spinner.setDefaultSpinnerString(spinnerString) - sets the default spinner string for all newly created instances.


## Example

```js
var Spinner = require('cli-spinner').Spinner;

var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();
```

[![NPM version](https://badge.fury.io/js/cli-spinner.png)](http://badge.fury.io/js/cli-spinner)
