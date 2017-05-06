var readline = require('readline');

var defaultSpinnerString = 0;
var defaultSpinnerDelay = 60;

function defaultOnTick(msg) {
  this.clearLine(this.stream);
  this.stream.write(msg);
};

var Spinner = function(options){
  if(!(this instanceof Spinner)) return new Spinner(options)

  if(typeof options === "string"){
    options = { text: options };
  } else if(!options){
    options = {};
  }

  this.text = options.text || '';
  this.setSpinnerString(defaultSpinnerString);
  this.setSpinnerDelay(defaultSpinnerDelay);
  this.onTick = options.onTick || defaultOnTick;
  this.stream = options.stream || process.stdout;
};

Spinner.spinners = require('./spinners.json');

Spinner.setDefaultSpinnerString = function(value) {
  defaultSpinnerString = value;
};

Spinner.setDefaultSpinnerDelay = function(value) {
  defaultSpinnerDelay = value;
};

Spinner.prototype.start = function() {

  var current = 0;
  var self = this;

  this.id = setInterval(function() {
    var msg = self.text.indexOf('%s') > -1
      ? self.text.replace('%s', self.chars[current])
      : self.chars[current] + ' ' + self.text;

    self.onTick(msg);

    current = ++current % self.chars.length;
  }, this.delay);
};

Spinner.prototype.isSpinning = function() {
  return this.id !== undefined;
}

Spinner.prototype.setSpinnerDelay = function(n) {
  this.delay = n;
};

Spinner.prototype.setSpinnerString = function(str) {
  this.chars = mapToSpinner(str, this.spinners).split('');
};

Spinner.prototype.setSpinnerTitle = function(str) {
  this.text = str;
}

Spinner.prototype.stop = function(clear) {
  clearInterval(this.id);
  this.id = undefined;
  if (clear) {
    this.clearLine(this.stream);
  } else {
    this.stream.write('\n');
  }
};

Spinner.prototype.clearLine = function(stream) {
  readline.clearLine(stream, 0);
  readline.cursorTo(stream, 0);
}

// Helpers

function isInt(value) {
  return (typeof value==='number' && (value%1)===0);
}

function mapToSpinner(value, spinners) {
  // Not an integer, return as strng
  if (!isInt(value)) {
    return value + '';
  }

  var length = Spinner.spinners.length;

  // Check if index is within bounds
  value = (value >= length) ? 0 : value;
  // If negative, count from the end
  value = (value < 0) ? length + value : value;

  return Spinner.spinners[value];
}

exports.Spinner = Spinner;
