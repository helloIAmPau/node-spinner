# node-spinner

A simple spinner for node cli.

[![NPM version](https://badge.fury.io/js/cli-spinner.png)](http://badge.fury.io/js/cli-spinner)

---

## Installation

This package is available on [npm](http://npmjs.com) as `cli-spinner`.

``` sh
npm install cli-spinner
```

## Example usage

````javascript
var Spinner = require('cli-spinner').Spinner;

var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();
````

## API

**`var obj = new Spinner('title')`**

Creates a new spinner object with the default options.

**`obj.start()`**

Starts the spinner.

**`obj.stop(clean)`**

Stops the spinner. Accepts a Boolean parameter to clean the console.

**`obj.setSpinnerString(spinnerString)`**

Sets the spinner string. Accepts either a String or Integer index.

**`obj.setSpinnerDelay(spinnerDelay)`**

Sets the spinner animation speed.

**`Spinner.setDefaultSpinnerString(spinnerString)`**

Sets the default spinner string for all newly created instances. Accepts either a String or Integer index.

**`Spinner.setDefaultSpinnerDelay(spinnerDelay)`**

Sets the default spinner delay for all newly created instances.