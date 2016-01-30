var readline = require('readline');

var defaultSpinnerString = 0;
var defaultSpinnerDelay = 60;

var Spinner = function(textToShow){
  this.text = textToShow || '';
  this.setSpinnerString(defaultSpinnerString);
  this.setSpinnerDelay(defaultSpinnerDelay);
};

Spinner.spinners = [
  '|/-\\',
  '⠂-–—–-',
  '◐◓◑◒',
  '◴◷◶◵',
  '◰◳◲◱',
  '▖▘▝▗',
  '■□▪▫',
  '▌▀▐▄',
  '▉▊▋▌▍▎▏▎▍▌▋▊▉',
  '▁▃▄▅▆▇█▇▆▅▄▃',
  '←↖↑↗→↘↓↙',
  '┤┘┴└├┌┬┐',
  '◢◣◤◥',
  '.oO°Oo.',
  '.oO@*',
  '🌍🌎🌏',
  '◡◡ ⊙⊙ ◠◠',
  '☱☲☴',
  '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓',
  '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆',
  '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋',
  '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁',
  '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈',
  '⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈',
  '⢄⢂⢁⡁⡈⡐⡠',
  '⢹⢺⢼⣸⣇⡧⡗⡏',
  '⣾⣽⣻⢿⡿⣟⣯⣷',
  '⠁⠂⠄⡀⢀⠠⠐⠈'
];

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
    var msg = self.text.indexOf('%s') > -1 ? self.text.replace('%s', self.chars[current]) : self.chars[current] + ' ' + self.text;
    clearLine();
    process.stdout.write(msg);
    current = ++current % self.chars.length;
  }, this.delay);
};

Spinner.prototype.isSpinning = function() {
  return !!this.id;
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

  // Check if index is within bounds
  value = (value >= Spinner.spinners.length) ? 0 : value;
  // If negative, count from the end
  value = (value < 0) ? Spinner.spinners.length + value : value;

  return Spinner.spinners[value];
}

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}

exports.Spinner = Spinner;
