var readline = require('readline');


var defaultSpinnerString = 0;
var defaultSpinnerDelay = 60;


function defaultOnTick(msg) {
  clearLine();
  process.stdout.write(msg);
};


var Spinner = function(textToShow){
  if(!(this instanceof Spinner)) return new Spinner(textToShow)

  this.text = textToShow || '';
  this.setSpinnerString(defaultSpinnerString);
  this.setSpinnerDelay(defaultSpinnerDelay);
};

Spinner.spinners = require('./spinners.json');

Spinner.setDefaultSpinnerString = function(value) {
  defaultSpinnerString = value;
};

Spinner.setDefaultSpinnerDelay = function(value) {
  defaultSpinnerDelay = value;
};

Spinner.prototype.start = function(onTick) {
  onTick = onTick || defaultOnTick;

  var current = 0;
  var self = this;

  this.id = setInterval(function() {
    var msg = self.text.indexOf('%s') > -1
            ? self.text.replace('%s', self.chars[current])
            : self.chars[current] + ' ' + self.text;

    onTick(msg);

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
    clearLine();
  }
};


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

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}


exports.Spinner = Spinner;
